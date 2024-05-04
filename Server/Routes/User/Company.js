const express = require("express");
const router = express.Router();
const fetchuser = require('../../Middleware/Fetchuser')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const multer = require('multer');

const User = require("../../Models/User");
const OTP = require("../../Models/EmailOtp");
const Company = require("../../Models/Company");
const SubUser = require("../../Models/SubUser");
const Prompts = require("../../Models/Prompts");


const upload = multer({ storage: multer.memoryStorage() });

const JWT_KEY = process.env.JWT_KEY;


const PhotosStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(9)
        return cb(null, './uploads/UserProfile');
        console.log(8)
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const PhotosUploader = multer({ storage: PhotosStorage });



const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
        user: "no-reply@earn4views.com",
        pass: "ZXCVBNM8j@",
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const sendOTPEmail = async (id, email, res) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`

        const mailOptions = {
            from: "no-reply@earn4views.com",
            to: email,
            subject: `Verify Your Email`,
            html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the proccess of Signup</p>
            <p>This OTP will expire in 15 Minute</p>`
        }


        const saltRounds = 10;
        const hashedOTP = await bcrypt.hash(otp, saltRounds)

        await OTP.deleteMany({ UserID: id });

        const otpresponse = await OTP.create({
            UserID: id,
            OTP: hashedOTP,
            createdAt: new Date(),
            expireAt: new Date(Date.now() + 240000)
        })

        await transporter.sendMail(mailOptions)

        return {
            status: "Pending",
            message: "Verification otp email send",
        };
    } catch (error) {
        return {
            status: "Failed",
            message: error.message,
        };
    }
}

///////
//API's Start
/////
//Create a user 
router.post("/createSubuser", fetchuser, async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {

        let owner = await User.findById(req.user.id);
        if (!owner) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        let company = await Company.findOne({ Owner_ID: req.user.id })
        if (!company) {
            return res.status(404).json({ success: false, message: "No Company Registerd Found" });
        }

        let user = await User.findOne({ Email: req.body.Email })
        if (user) {
            return res.status(404).json({ success, error: "This Email already exist" })
        }


        const Salt = await bcrypt.genSalt(10);
        const SecPassword = await bcrypt.hash(req.body.Password, Salt)

        user = await User.create({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Phone: req.body.Phone,
            User_Type:"SubUser",
            Status: "Active",
            Password: SecPassword
        })

        user = await SubUser.create({
            User_ID: req.user.id,
            Company_ID: company._id,
            Own_ID: user._id,
        })


        const response = await sendOTPEmail(user._id, req.body.Email, res);


        success = true;
        res.json({ success:true})

    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }
})

router.put("/editSubuser/:subuserId", fetchuser, async (req, res) => {
    let success = false;
    try {
        let owner = await User.findById(req.user.id);
        if (!owner) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const subuserId = req.params.subuserId;

        let subuser = await SubUser.findById(subuserId);
        if (!subuser) {
            return res.status(404).json({ success: false, message: "Subuser not found" });
        }

        let user = await User.findById(subuser.Own_ID);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the user has permission to edit this subuser
        if (subuser.User_ID.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "You do not have permission to edit this subuser" });
        }

        // Update subuser fields
        user.FirstName = req.body.FirstName || user.FirstName;
        user.LastName = req.body.LastName || user.LastName;
        user.Email = req.body.Email || user.Email;
        user.Phone = req.body.Phone || user.Phone;

        await user.save();

        success = true;
        res.json({ success });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

router.delete("/deleteSubuser/:subuserId", fetchuser, async (req, res) => {
    try {
        let owner = await User.findById(req.user.id);
        if (!owner) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const subuserId = req.params.subuserId;

        let subuser = await SubUser.findById(subuserId);
        if (!subuser) {
            return res.status(404).json({ success: false, message: "Subuser not found" });
        }



        // Check if the user has permission to edit this subuser
        if (subuser.User_ID.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "You do not have permission to edit this subuser" });
        }

        let user = await User.findByIdAndDelete(subuser.Own_ID);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        await subuser.remove();

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

router.put("/deactivateSubuser/:subuserId", fetchuser, async (req, res) => {
    let success = false;
    try {
        let owner = await User.findById(req.user.id);
        if (!owner) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const subuserId = req.params.subuserId;

        let subuser = await SubUser.findById(subuserId);
        if (!subuser) {
            return res.status(404).json({ success: false, message: "Subuser not found" });
        }

        let user = await User.findById(subuser.Own_ID);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the user has permission to edit this subuser
        if (subuser.User_ID.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "You do not have permission to edit this subuser" });
        }

        user.Status = "InActive";

        await user.save();

        success = true;
        res.json({ success });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});



router.get('/prompts/:department', async (req, res) => {
    try {
        const department = req.params.department;

        // Fetch data based on department
        const data = await Prompts.find({ Department: department });

        // Categorize data by Type
        const categorizedData = {};
        data.forEach(prompt => {
            if (!categorizedData[prompt.Type]) {
                categorizedData[prompt.Type] = [];
            }
            categorizedData[prompt.Type].push(prompt);
        });

        // Format categorized data
        const formattedData = Object.keys(categorizedData).map(Type => ({
            Type: Type,
            List: categorizedData[Type]
        }));

        res.send(formattedData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router