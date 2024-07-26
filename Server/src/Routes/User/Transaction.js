const express = require("express");
const router = express.Router();
// const ejs = require('ejs')
const fetchuser = require('../../Middleware/Fetchuser')
// const pdf = require('html-pdf')
const nodemailer = require("nodemailer")
// const path = require('path')
const User = require("../../Models/User");
const Company = require("../../Models/Company");
const Transaction = require("../../Models/Transaction");
const PromoCode = require("../../Models/PrompoCode");
const fs = require("fs")
const puppeteer = require('puppeteer');
const ejs = require('ejs');
const path = require('path');

const transporter = nodemailer.createTransport({
  host: "smtp.world4you.com",
  port: 587, // Use port 587 for STARTTLS or 465 for SSL
  secure: false,
  auth: {
    user: "no-reply@junito.at",
    pass: "Scott691980!",
  }
});

router.post('/registertransactions', async (req, res) => {
  let success = false;
  try {
    const { id: userid, Amount, DateCreated, ExpiryDate, Status, Plan, data, discount, DiscountPerce } = req.body;

    // Validate input data
    if (!userid || !Amount || !DateCreated || !ExpiryDate || !Status || !Plan) {
      return res.status(400).json({ success, message: "Missing required fields" });
    }

    // Find user by ID
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ success, message: "User not found" });
    }

    // Find company by Owner_ID
    const company = await Company.findOne({ Owner_ID: userid });
    if (!company) {
      return res.status(404).json({ success, message: "Company not found" });
    }

    // Update or create transaction
    const transaction = await Transaction.findOneAndUpdate(
      { User_ID: userid },
      { Amount, DateCreated, ExpiryDate, Status, Plan },
      { new: true, upsert: true }
    );

    success=true;

    // Render HTML for PDF
    ejs.renderFile(
      path.join(__dirname, '../../views/', 'index.ejs'),
      { user, transaction, company, data, discount, DiscountPerce },
      async (err, htmlContent) => {
        if (err) {
          console.error("EJS Rendering Error:", err);
          return res.status(500).json({ message: "EJS Rendering Error", err, success });
        }

        try {
          // Validate Chrome executable path
          const executablePath = '/usr/bin/google-chrome';
          if (!fs.existsSync(executablePath)) {
            console.error(`Chrome executable not found at path: ${executablePath}`);
            return res.status(500).json({ 
              message: `Chrome executable not found at path: ${executablePath}`, 
              success
            });
          }

          const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });

          // Create a new page and set content
          const page = await browser.newPage();
          await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

          // Wait for the specific selector
          await page.waitForSelector('#Major', { timeout: 60000 });

          // Generate PDF from the content
          const pdfBuffer = await page.pdf({
            format: 'A4',
            timeout: 60000,
            printBackground: true
          });

          // Close the browser
          await browser.close();

          console.log("File Created Successfully");

          // Prepare email details with attachment
          const mailDetails = {
            from: "no-reply@junito.at",
            to: user.Email,
            subject: "Junito Payment Invoice",
            text: "Below is Your Payment Invoice for Junito BizzBot Platform",
            attachments: [
              {
                filename: 'Invoice.pdf',
                content: pdfBuffer
              }
            ]
          };

          // Send email with the PDF attachment
          transporter.sendMail(mailDetails, (err, data) => {
            if (err) {
              console.error("Email Sending Error:", err);
              return res.status(500).send({ message: "Email Sending Error", err, success });
            }

            console.log("Email Sent Successfully");
            res.status(200).send({ success: true, transaction });
          });

        } catch (puppeteerError) {
          console.error("Puppeteer Error:", puppeteerError);
          return res.status(500).json({
            message: "Failed to generate PDF or send email",
            err: puppeteerError.message,
            success
          });
        }
      }
    );

  } catch (error) {
    console.error("General Error:", error);
    res.status(400).json({ message: "Catch Error", err: error.message, success });
  }
});




router.put('/SubUserAdd', fetchuser, async (req, res) => {
  let success = false;
  try {
    const userId = req.user.id;
    const { subUserIds, DateCreated, ExpiryDate, beforediscount, DiscountPerce, data } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success, message: "User not found" });
    }

    // Check if the company exists
    const company = await Company.findOne({ Owner_ID: userId });
    if (!company) {
      return res.status(404).json({ success, message: "Company not found" });
    }

    // Check if the transaction exists
    const transaction = await Transaction.findOne({ User_ID: userId });
    if (!transaction) {
      return res.status(404).json({ success, message: "Transaction not found" });
    }

    let totalAddedAmount = 0;

    // Iterate over each subUserId
    for (const subUserId of subUserIds) {
      // Find the subuser in the transaction
      const subUser = transaction.subUsers.find(su => su.User.toString() === subUserId);
      if (!subUser) {
        return res.status(404).json({ success, message: `SubUser with id ${subUserId} not found` });
      }

      // Update the status of the subuser to "Paid"
      subUser.Status = "Paid";
      subUser.DateCreated = DateCreated;
      subUser.ExpiryDate = ExpiryDate;

      // Add 50 to the transaction amount for each subuser
      totalAddedAmount += 50;
    }

    // Update the total transaction amount
    transaction.Amount += totalAddedAmount;

    // Save the updated transaction
    await transaction.save();

    success = true;

    // Render the updated invoice
    ejs.renderFile(
      path.join(__dirname, '../../views/', 'indexsubuser.ejs'),
      {
        user,
        transaction,
        data,
        subUsers: transaction.subUsers.filter(su => subUserIds.includes(su.User.toString())),
        beforediscount,
        DiscountPerce,
        totalAddedAmount
      },
      async (err, htmlContent) => {
        if (err) {
          console.error("EJS Rendering Error:", err);
          return res.status(500).json({ message: "EJS Rendering Error", err, success });
        }

        try {
          // Validate Chrome executable path
          const executablePath = '/usr/bin/google-chrome';
          if (!fs.existsSync(executablePath)) {
            console.error(`Chrome executable not found at path: ${executablePath}`);
            return res.status(500).json({ 
              message: `Chrome executable not found at path: ${executablePath}`, 
              success
            });
          }

          const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });

          // Create a new page and set content
          const page = await browser.newPage();
          await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

          // Wait for the specific selector
          await page.waitForSelector('#Major', { timeout: 60000 });

          // Generate PDF from the content
          const pdfBuffer = await page.pdf({
            format: 'A4',
            timeout: 60000,
            printBackground: true
          });

          // Close the browser
          await browser.close();

          console.log("File Created Successfully");

          // Prepare email details with attachment
          const mailDetails = {
            from: "no-reply@junito.at",
            to: user.Email,
            subject: "Junito Payment Invoice",
            text: "Below is Your Payment Invoice for Junito Platform",
            attachments: [
              {
                filename: 'Invoice.pdf',
                content: pdfBuffer
              }
            ]
          };

          // Send email with the PDF attachment
          transporter.sendMail(mailDetails, (err, data) => {
            if (err) {
              console.error("Email Sending Error:", err);
              return res.status(500).json({ message: "Email Sending Error", err, success });
            }

            console.log("Email Sent Successfully");
            success = true;
            res.status(200).json({ success, transaction });
          });

        } catch (puppeteerError) {
          console.error("Puppeteer Error:", puppeteerError);
          return res.status(500).json({
            message: "Failed to generate PDF or send email",
            err: puppeteerError.message,
            success
          });
        }
      }
    );

  } catch (error) {
    console.error("General Error:", error);
    res.status(400).json({ message: "Catch Error", err: error.message, success });
  }
});





router.get('/transactions/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find transactions by User_ID
    const transactions = await Transaction.findOne({ User_ID: userId })
      .populate('User_ID')
      .populate('Company_ID')
      .populate('subUsers.User');

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.put('/CheckSubUser', async (req, res) => {
  try {
    const { userId } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if the transaction exists
    const transaction = await Transaction.findOne({ User_ID: userId });
    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    // Current date
    const currentDate = new Date();

    // Iterate through each subUser
    transaction.subUsers.forEach(subUser => {
      const expiryDate = new Date(subUser.ExpiryDate);
      const timeDiff = expiryDate - currentDate;
      const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
      console.log(timeDiff)
      console.log(daysDiff)

      // Check if the expiry date is within two days
      if (daysDiff <= 2) {
        subUser.Status = "UnPaid";
      }
    });

    // Save the updated transaction
    await transaction.save();

    res.status(200).json({ success: true, transaction });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});


// Read a promo code by ID
router.get("/getPromoCode/:promocode", async (req, res) => {
  try {
    const promoCode = await PromoCode.findOne({ PromoCode: req.params.promocode });
    if (!promoCode) {
      return res.status(404).json({ success: false, message: "Promo code not found" });
    }

    if (promoCode.ExpiryDate == new Date()) {
      return res.status(404).json({ success: false, message: "This Promotion is Expired Know" });
    }



    res.status(200).json({ success: true, data: promoCode });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred');
  }
});

module.exports = router
