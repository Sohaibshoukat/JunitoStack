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

const puppeteer = require('puppeteer');
const ejs = require('ejs');
const path = require('path');

const transporter = nodemailer.createTransport({
  host: "smtp.world4you.com",
  port: 465,
  secure: true,
  auth: {
      user: "no-reply@junito.at",
      pass: "BizBot2024!",
  },
  tls: {
      rejectUnauthorized: false,
  },
});

router.post('/registertransactions', async (req, res) => {
  try {
    let userid = req.body.id;
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const company = await Company.findOne({ Owner_ID: userid });
    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    const transaction = await Transaction.findOneAndUpdate(
      { User_ID: userid },
      {
        Amount: req.body.Amount,
        DateCreated: req.body.DateCreated,
        ExpiryDate: req.body.ExpiryDate,
        Status: req.body.Status,
        Plan: req.body.Plan
      },
      { new: true }
    );
    console.log(req.body)


    ejs.renderFile(
      path.join(__dirname, '../../views/', 'index.ejs'),
      {
        user: user,
        transaction: transaction,
        company: company,
        data: req.body.data,
        discount: req.body.discount,
        DiscountPerce: req.body.DiscountPerce,
      },
      async (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ err, message: "i am here" });
        }

        const options = {
          format: 'A4',
          timeout: 60000,
          printBackground: true
        };

        const browser = await puppeteer.launch({
          executablePath: '/usr/bin/google-chrome',
          headless: true, 
          args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--single-process',
          ],
        });
      
        const page = await browser.newPage();
        await page.setContent(data, { waitUntil: 'networkidle0' });


        await page.waitForSelector('#Major', { timeout: 60000 });

        const pdfBuffer = await page.pdf(options);
        await browser.close();

        console.log("File Created Successfully");

        let mailDetails = {
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

        transporter.sendMail(mailDetails, function (err, data) {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }

          console.log("Email Sent Successfully");
          res.status(200).send({ success: true, transaction });
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "catch error", err: error });
  }
});



router.put('/SubUserAdd', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { subUserIds, DateCreated, ExpiryDate, beforediscount, DiscountPerce, data } = req.body;
    console.log(subUserIds);

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

    let totalAddedAmount = 0;

    // Iterate over each subUserId
    for (const subUserId of subUserIds) {
      // Find the subuser in the transaction
      const subUser = transaction.subUsers.find(su => su.User.toString() === subUserId);
      if (!subUser) {
        return res.status(404).json({ success: false, message: `SubUser with id ${subUserId} not found` });
      }

      // Update the status of the subuser to "Paid"
      subUser.Status = "Paid";
      subUser.DateCreated = DateCreated;
      subUser.ExpiryDate = ExpiryDate;

      // Add 50 to the transaction amount for each subuser
      totalAddedAmount += 50;
    }

    // Update the total transaction amount
    transaction.Amount = transaction.Amount + totalAddedAmount;

    // Save the updated transaction
    await transaction.save();

    // Render the updated invoice
    ejs.renderFile(
      path.join(__dirname, '../../views/', 'indexsubuser.ejs'),
      {
        user: user,
        transaction: transaction,
        data: data,
        subUsers: transaction.subUsers.filter(su => subUserIds.includes(su.User.toString())),
        beforediscount: beforediscount,
        DiscountPerce: DiscountPerce,
        totalAddedAmount: totalAddedAmount
      },
      async (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }

        const options = {
          format: 'A4',
          timeout: 60000, // Increased timeout to 60 seconds
          printBackground: true
        };

        const browser = puppeteer.launch({
          executablePath: '/usr/bin/google-chrome',
          headless: true, 
          args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--single-process',
          ],
        });
        const page = await browser.newPage();
        await page.setContent(data, { waitUntil: 'networkidle0' });

        await page.waitForSelector('#Major', { timeout: 60000 });

        const pdfBuffer = await page.pdf(options);
        await browser.close();

        console.log("File Created Successfully");

        let mailDetails = {
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

        transporter.sendMail(mailDetails, function (err, data) {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }

          console.log("Email Sent Successfully");
          res.status(200).send({ success: true, transaction });
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, error: error.message });
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
