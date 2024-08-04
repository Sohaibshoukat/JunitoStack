const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const Emails = require("../../Models/Email");




const transporter = nodemailer.createTransport({
    host: "smtp.world4you.com",
    port: 587,
    secure: false,
    auth: {
        user: "no-reply@junito.at",
        pass: "Scott691980!", 
    }
});


const sendEmail = async (Name, Email,Phone, Company, Subject, Message, res) => {
    try {

        const mailOptions = {
            from: "no-reply@junito.at",
            to: "no-reply@junito.at",
            subject: `${Name} | ${Subject}`,
            html: `
      <div><p style="font-size:16px"><span style="font-weight:700;font-size:20px">Name:</span> ${Name}</p></div>
      <div><p style="font-size:16px"><span style="font-weight:700;font-size:20px">Email:</span> ${Email}</p></div>
      <div><p style="font-size:16px"><span style="font-weight:700;font-size:20px">Phone:</span> ${Phone}</p></div>
      <div><p style="font-size:16px"><span style="font-weight:700;font-size:20px">Company:</span> ${Company}</p></div>
      <br/>
      <div><p style="font-size:16px"><span style="font-weight:700;font-size:20px">Message:</span> ${Message}</p></div>`
        }

        const response = await transporter.sendMail(mailOptions)

        return {
            response:response,
            status: true
        };
    } catch (error) {
        return {
            status: "Failed",
            message: error,
        };
    }
}


// Create a user
router.post("/sendMail", async (req, res) => {
    try {
        const { Name, Email, Phone, Company, Subject, Message } = req.body;

        const response = await sendEmail(Name, Email, Phone, Company, Subject, Message);

        let savedemail = await Emails.create({
            Email: Email,
            Company: Company,
            Name:Name,
            Phone:Phone,
            Subject: Subject,
            Status: "Active",
        })

        if (response.status) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});


const sendEmailContact = async (Name, Email, Message, res) => {
    try {

        const mailOptions = {
            from: "no-reply@junito.at",
            to: "no-reply@junito.at",
            subject: `${Name}`,
            html: `
        <div><p style="font-size:16px"><span style="font-weight:700;font-size:20px">Name:</span> ${Name}</p></div>
        <div><p style="font-size:16px"><span style="font-weight:700;font-size:20px">Email:</span> ${Email}</p></div>
        <br/>
        <div><p style="font-size:16px"><span style="font-weight:700;font-size:20px">Message:</span> ${Message}</p></div>`
        }

        const response = await transporter.sendMail(mailOptions)

        return {
            response : response,
            status: true
        };
    } catch (error) {
        return {
            status: "Failed",
            message: error,
        };
    }
}

// Create a user
router.post("/sendcontactMail", async (req, res) => {
    try {
        const { Name, Email, Message } = req.body;

        const response = await sendEmailContact(Name, Email, Message);

        let savedemail = await Emails.create({
            Email: Email,
            Name:Name,
            Status: "Active",
        })

        if (response.status) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

const sendEmailRead = async (Email, Department, res) => {
    try {

        const mailOptions = {
            from: "no-reply@junito.at",
            to: "no-reply@junito.at",
            subject: `${Email} | ${Department}`,
            html: `
      <div><p style="font-size:16px"><span style="font-weight:700;font-size:20px">Email:</span> ${Email}</p></div>
      <br/>
      <div><p style="font-size:16px"><span style="font-weight:700;font-size:20px">Message:</span> This customer is intrested in ${Department}</p></div>`
        }

        await transporter.sendMail(mailOptions)

        return {
            status: true
        };
    } catch (error) {
        return {
            status: "Failed",
            message: error.message,
        };
    }
}

router.post("/sendMailMore", async (req, res) => {
    try {
        const { Email, Department } = req.body;

        const response = await sendEmailRead(Email, Department);

        if (response.status) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

module.exports = router