const express = require("express");
const router = express.Router();
const fetchuser = require('../../Middleware/Fetchuser')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const multer = require('multer');
const fetch = require('node-fetch');
const User = require("../../Models/User");
const OTP = require("../../Models/EmailOtp");
const Company = require("../../Models/Company");
const Transaction = require("../../Models/Transaction");
const SubUser = require("../../Models/SubUser");
const dayjs = require('dayjs');

const JWT_KEY = process.env.JWT_KEY;
const ClientID = process.env.PAYPAL_CLIENT_ID;
const SecretKey = process.env.PAYPAL_SECERET_KEY;

const PhotosStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './src/Uploads/ProfilePhoto/User');
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const PhotosUploader = multer({ storage: PhotosStorage });



const transporter = nodemailer.createTransport({
    host: "smtp.world4you.com",
    port: 587, // Use port 587 for STARTTLS or 465 for SSL
    secure: false,
    auth: {
        user: "no-reply@junito.at",
        pass: "Scott691980!",
    }
});

const sendOTPEmail = async (id, email, res) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`

        const mailOptions = {
            from: "no-reply@junito.at",
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

        const response = await transporter.sendMail(mailOptions)

        return {
            status: "Pending",
            message: "Verification otp email send",
            response: response
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
router.post("/createuser", async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {

        let user = await User.findOne({ Email: req.body.Email })
        if (user) {
            return res.status(404).json({ success, error: "This Email already exist" })
        }


        const Salt = await bcrypt.genSalt(10);
        const SecPassword = await bcrypt.hash(req.body.Password, Salt)

        user = await User.create({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            CompanyName: req.body.CompanyName,
            Email: req.body.Email,
            Phone: req.body.Phone,
            Status: "Active",
            User_Type: "Owner",
            Password: SecPassword
        })


        let company = await Company.create({
            CompanyName: req.body.CompanyName,
            Country: req.body.Country,
            Owner_ID: user._id
        })

        let transaction = await Transaction.create({
            User_ID: user._id,
            Company_ID: company._id,
            Amount: 0,
            subUsers: [],
            Status: "UnPaid"
        });


        const response = await sendOTPEmail(user._id, req.body.Email, res);

        const data = {
            user: {
                id: user.id,
            }
        }

        const AuthToken = jwt.sign(data, JWT_KEY);

        success = true;
        res.json({ success, AuthToken: user.id, response })

    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }
})

//Create Password
router.post("/createpassword/:id", async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {

        let user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ success, error: "No User Found" })
        }

        if (user.ActiveUsed == true) {
            return res.status(404).json({ success, error: "You alreaded Created Password" })
        }


        const Salt = await bcrypt.genSalt(10);
        const SecPassword = await bcrypt.hash(req.body.Password, Salt)

        const userfield = {
            Is_Verfied: true,
            ActiveUsed: true,
            Password: SecPassword
        }

        const newUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: userfield },
            { new: true }
        );

        success = true;
        res.json({ success })

    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }
})

//Verify OTP
router.post("/verifyOTP", async (req, res) => {
    try {
        let { id, otp } = req.body;
        const userID = id;
        if (!userID || !otp) {
            res.json({
                status: "Failed",
                message: "Empty otp details are not allowed"
            });
        } else {
            const otpVerification = await OTP.findOne({ UserID: userID });

            if (!otpVerification) {
                res.json({
                    success: false,
                    message: "Account record doesn't exist"
                });
            } else {
                const { expireAt } = otpVerification;
                const hashedOTP = otpVerification.OTP;

                if (expireAt < new Date()) {
                    await OTP.deleteMany({ UserID: userID });
                    res.json({
                        success: false,
                        message: "Code has expired. Please request again"
                    });
                } else {
                    const validOTP = await bcrypt.compare(otp, hashedOTP);
                    if (!validOTP) {
                        res.json({
                            success: false,
                            message: "Invalid code passed. Check your inbox"
                        });
                    } else {
                        await User.updateOne({ _id: userID }, { Is_Verfied: true });
                        await OTP.deleteMany({ UserID: userID });

                        const data = {
                            user: {
                                id: id,
                            }
                        }

                        const AuthToken = jwt.sign(data, JWT_KEY);

                        res.json({
                            success: true,
                            AuthToken: AuthToken,
                            message: "User Email verified successfully"
                        });
                    }
                }
            }
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});

//Send OTP Again
router.post("/SendOTPagain", async (req, res) => {
    try {
        const { id } = req.body;
        const userID = id;

        // Delete existing OTP verification document
        await OTP.deleteMany({ UserID: userID });

        // Fetch user data by userID
        const user = await User.findOne({ _id: userID });

        if (!user) {
            res.json({
                success: false,
                message: "User not found"
            });
            return;
        }

        const email = user.Email;

        // Send new OTP email
        const response = await sendOTPEmail(userID, email);


        res.json({
            reponse: response,
            success: true,
            message: "OTP Sent Successfully"
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});

//Send OTP for forget Password
router.post("/SendOTPemail", async (req, res) => {
    try {
        const { email } = req.body;

        // Fetch user data by userID
        const user = await User.findOne({ Email: email });


        if (!user) {
            res.json({
                success: false,
                message: "No User with this Email"
            });
            return;
        }

        await OTP.deleteMany({ UserID: user._id });


        // Send new OTP email
        await sendOTPEmail(user._id, email);

        res.json({
            success: true,
            id: user._id,
            message: "OTP Sent Successfully"
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});

//Login a user
router.post("/loginuser", async (req, res) => {
    let success = false;
    const { Email, Password } = req.body;

    try {
        let user = await User.findOne({ Email: Email })
        if (!user) {
            return res.status(400).json({ success: false, message: "Account doesn't Found" })
        }
        const passwordCompare = await bcrypt.compare(Password, user.Password)
        if (!passwordCompare) {
            return res.status(400).json({ success: false, message: "UserName or Password Does not Find" })
        }

        if (user.User_Type == "Owner") {
            let transaction = await Transaction.findOne({ User_ID: user._id });
            if (transaction.Plan == "AdminFree") {
                if (dayjs(transaction.ExpiryDate).isBefore(dayjs().add(2, 'day'), 'day')) {
                    transaction.Status="UnPaid";
                    transaction.Plan = "";
                    if (transaction?.subUsers?.length > 0) {
                        transaction.subUsers[0].Status = "UnPaid";
                    }
                    await transaction.save()
                    return res.status(400).json({
                        Status: "UnPaid",
                        type: "User",
                        message: "Your Admin Trial is Expired Continue Payment for next plan",
                        id: user._id
                    });
                }
            }
            else if (transaction.Status == "UnPaid") {
                return res.status(400).json({
                    Status: "UnPaid",
                    type: "User",
                    message: "You are Unpaid upgrade your payment plam",
                    id: user._id
                });
            }
            else {
                const response = await fetch(`https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${transaction.SubscriptionID}`, {
                    headers: {
                        'Authorization': `Basic QWFCX24ycUJGYXFZMFQ3aXBLNldFWVR6WXZnNHlvTXdGSU9xLVJwMHZET3l5UVlhaV8tdmZUa3pBWFNKaDVUdFlQWnUtWTVTZ2ZfR3NpWDM6RUhxQUNIUHNJY0Q1MWhpaEJzeWgyUEJGcFRaRGQ4QXpPRDZEeERURWtKRjVIM2lFTkdGNkViWG1zYW1VVHJFS2dTalFXT2pSNjJxbnctOV8=`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json()
                if (dayjs(data.billing_info.next_billing_time).isBefore(dayjs().add(2, 'day'), 'day')) {
                    if (transaction?.subUsers?.length > 0) {
                        transaction.subUsers[0].Status = "UnPaid";
                    }
                    return res.status(400).json({
                        Status: "Expired",
                        type: "User",
                        message: "Your Payment is Due 2 days clear your payment to continue using the platform.",
                        id: user._id
                    });
                } else {
                    if (transaction?.subUsers?.length > 0) {
                        transaction.subUsers[0].Status = "Paid";
                    }
                }
            }
        } else {
            let Owner = await SubUser.findOne({ Own_ID: user._id });
            let transaction = await Transaction.findOne({ User_ID: Owner.User_ID });
            const subUser = transaction.subUsers.find(su => {
                if (su.User.toString() == user._id.toString()) {
                    return su;
                }
            });

            if (!subUser) {
                return res.status(404).json({ success: false, message: "SubUser not found" });
            }
            if (subUser.Status == "UnPaid") {
                return res.status(400).json({
                    Status: "Expired",
                    type: "User",
                    message: "Your Payment is Due 2 days clear your payment to continue using the platform.",
                    id: user._id
                });
            } else {
                const response = await fetch(`https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${transaction.SubscriptionID}`, {
                    headers: {
                        'Authorization': `Basic QWFCX24ycUJGYXFZMFQ3aXBLNldFWVR6WXZnNHlvTXdGSU9xLVJwMHZET3l5UVlhaV8tdmZUa3pBWFNKaDVUdFlQWnUtWTVTZ2ZfR3NpWDM6RUhxQUNIUHNJY0Q1MWhpaEJzeWgyUEJGcFRaRGQ4QXpPRDZEeERURWtKRjVIM2lFTkdGNkViWG1zYW1VVHJFS2dTalFXT2pSNjJxbnctOV8=`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json()
                if (dayjs(data.billing_info.next_billing_time).isBefore(dayjs().add(2, 'day'), 'day')) {
                    return res.status(400).json({
                        Status: "Expired",
                        type: "User",
                        message: "Your Payment is Due 2 days clear your payment to continue using the platform.",
                        id: user._id
                    });
                }
            }
        }

        const Payload = {
            user: {
                id: user.id,
            }
        }

        const AuthToken = jwt.sign(Payload, JWT_KEY);
        success = true;

        if (!user.Is_Verfied) {
            const respponse = await sendOTPEmail(user._id, user.Email);
            return res.json({ success: true, Email: false, message: "Email Verification Required", AuthToken: user.id, id: user._id, respponse });
        }

        res.json({ success, AuthToken, User_Type: user.User_Type, id: user.id })

    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }
})

//Upload Profile Image
router.put("/UpProImg", fetchuser, PhotosUploader.single('Proimg'), async (req, res) => {
    try {
        let userid = req.user.id;
        let path = req.file.path;
        let remainingUrl = path.replace('uploads/', '')

        const user = await User.findById({ _id: userid }).select("ProfilePhoto");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        await User.findOneAndUpdate(
            { _id: userid },
            { ProfilePhoto: remainingUrl }
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).send('Error occurred');
    }
});

//Get User Data
router.get("/getuser", fetchuser, async (req, res) => {
    try {
        let userid = req.user.id;
        const user = await User.findById({ _id: userid });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!user.ProfilePhoto) {
            const userData = { ...user.toObject(), ProfilePhoto: undefined };
            res.json({ success: true, userData: userData });

        } else {
            res.json({ success: true, userData: user });
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }
})

router.get("/getbyid/:id", async (req, res) => {
    try {
        let userid = req.params.id;
        const user = await User.findById({ _id: userid });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!user.ProfilePhoto) {
            const userData = { ...user.toObject(), ProfilePhoto: undefined };
            res.json({ success: true, userData: userData });
        } else {
            res.json({ success: true, userData: user });
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }
})

//Get Profile Image
router.get("/getProImg", fetchuser, async (req, res) => {
    try {
        let userid = req.user.id;
        const user = await User.findById({ _id: userid }).select("ProfilePhoto");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!user.ProfilePhoto) {
            res.json({ success: true, ImageData: false });
        } else {
            res.json({ success: true, ImageData: true, user: user });
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }
})

//Update User Data
router.put("/UpdateUser", fetchuser, PhotosUploader.fields([{ name: 'ProfilePhoto', maxCount: 1 }]), async (req, res) => {
    try {
        const { FirstName, LastName, Phone, Age, Gender } = req.body;
        let path = req.files && req.files.ProfilePhoto ? req.files.ProfilePhoto[0].path : null;

        const newUser = {};
        if (FirstName) newUser.FirstName = FirstName;
        if (LastName) newUser.LastName = LastName;
        if (Phone) newUser.Phone = Phone;
        if (Age) newUser.Age = Age;
        if (Gender) newUser.Gender = Gender;
        if (path) newUser.ProfilePhoto = path

        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user = await User.findByIdAndUpdate(req.user.id, { $set: newUser }, { new: true });
        res.json({ success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

//Change Password
router.put("/ChangePassword", fetchuser, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(400).json({ error: "Account not found" });
        }

        const passwordCompare = await bcrypt.compare(oldPassword, user.Password);

        if (!passwordCompare) {
            return res.json({ success: false, message: "Invalid Old Password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password in MongoDB
        user.Password = hashedNewPassword;
        await user.save();

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

//Forget Password
router.put("/forgetPassword", fetchuser, async (req, res) => {
    try {
        const { OTPReq, NewPassword } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(400).json({ error: "Account not found" });
        }

        const otpVerification = await OTP.findOne({ UserID: req.user.id });

        if (!otpVerification) {
            return res.json({
                success: false,
                message: "Request OTP Again"
            });
        }

        const { expireAt } = otpVerification;
        const hashedOTP = otpVerification.OTP;

        if (expireAt < new Date()) {
            await OTP.deleteMany({ UserID: req.user.id });
            return res.json({
                success: false,
                message: "Code has expired. Please request again"
            });
        }

        const validOTP = await bcrypt.compare(OTPReq, hashedOTP);

        if (!validOTP) {
            return res.json({
                success: false,
                message: "Invalid code passed. Check your inbox"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(NewPassword, salt);

        // Update the user's password in MongoDB
        user.Password = hashedNewPassword;
        await user.save();

        // Delete the OTP verification record
        await OTP.deleteMany({ UserID: req.user.id });

        res.json({
            success: true,
            message: "Password Updated successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

//Forget Password with email
router.put("/forgetPasswordemail", async (req, res) => {
    try {
        const { OTPReq, NewPassword, id } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({ error: "Account not found" });
        }

        const otpVerification = await OTP.findOne({ UserID: id });

        if (!otpVerification) {
            return res.json({
                success: false,
                message: "Request OTP Again"
            });
        }

        const { expireAt } = otpVerification;
        const hashedOTP = otpVerification.OTP;

        if (expireAt < new Date()) {
            await OTP.deleteMany({ UserID: id });
            return res.json({
                success: false,
                message: "Code has expired. Please request again"
            });
        }

        const validOTP = await bcrypt.compare(OTPReq, hashedOTP);

        if (!validOTP) {
            return res.json({
                success: false,
                message: "Invalid code passed. Check your inbox"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(NewPassword, salt);

        // Update the user's password in MongoDB
        user.Password = hashedNewPassword;
        await user.save();

        // Delete the OTP verification record
        await OTP.deleteMany({ UserID: id });

        res.json({
            success: true,
            message: "Password Updated successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});



router.get("/getcompany", fetchuser, async (req, res) => {
    try {
        let userid = req.user.id;
        const company = await Company.findOne({ Owner_ID: userid });
        if (!company) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, company });
    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }
})

router.put('/updatecompany', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from request
        const companyData = req.body; // Extract data from request body

        const NewData = {
            CompanyName: companyData?.CompanyName,
            Address: companyData?.Address,
            CompanyMoto: companyData?.CompanyDescription,
            NumEmployee: companyData?.NumEmployee,
            CompanySell: companyData?.CompanySell,
            ContactEmail: companyData?.ContactEmail,
            CollectiveAgreement: companyData?.CollectiveAgreement,
            Customers: companyData?.Customers,
            Struture: companyData?.Structure,
            dailyoperation: companyData?.DailyOperation,
            rules: companyData?.Rules,
            communication: companyData?.Communication,
            questions: companyData?.Questions,
            feedback: companyData?.Feedback
        }

        // Find company by owner ID and update it
        const company = await Company.findOneAndUpdate(
            { Owner_ID: userId },
            { $set: NewData },
            { new: true, runValidators: true }
        );

        if (!company) {
            return res.status(404).json({ success: false, message: 'Company not found' });
        }

        res.json({ success: true, company });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router
