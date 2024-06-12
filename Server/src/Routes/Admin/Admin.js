const express = require("express");

const Admin = require("../../Models/Admin")
const fetchadmin = require('../../Middleware/FetchAdmin')
const FAQ = require("../../Models/FAQ");

const router = express.Router();
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const Adminotps = require("../../Models/AdminEmailOtp");
const Prompts = require("../../Models/Prompts");
const User = require("../../Models/User");
const SubUser = require("../../Models/SubUser");
const Emails = require("../../Models/Email");
const Company = require("../../Models/Company");
const Chat = require("../../Models/Chat");
const multer = require('multer');



const PhotosStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(9)
        return cb(null, './Uploads/ProfilePhoto/Admin');
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
            html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the proccess</p>
            <p>This OTP will expire in 15 Minute</p>`
        }


        const saltRounds = 10;
        const hashedOTP = await bcrypt.hash(otp, saltRounds)

        await Adminotps.deleteMany({ UserID: id });

        const otpresponse = await Adminotps.create({
            AdminID: id,
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



const JWT_KEY = process.env.JWT_KEY



//Create a admin 
router.post("/createAdmin", fetchadmin, async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {

        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        admin = await Admin.findOne({ Email: req.body.Email })
        if (admin) {
            return res.status(404).json({ success, error: "this account already exist" })
        }


        const Salt = await bcrypt.genSalt(10);
        const SecPassword = await bcrypt.hash(req.body.Password, Salt)
        admin = await Admin.create({
            Email: req.body.Email,
            Name: req.body.Name,
            Password: SecPassword,
        })

        const data = {
            admin: {
                id: admin.id,
            }
        }

        const AdminBizzToken = jwt.sign(data, JWT_KEY);

        success = true;
        res.json({ success, AdminBizzToken })

    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }
})

//Login a admin
router.post("/loginAdmin", async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { Email, Password } = req.body;

    try {
        let admin = await Admin.findOne({ Email: Email })
        if (!admin) {
            return res.status(400).json({ success: false, Message: "Account does not Exist" })
        }

        const passwordCompare = await bcrypt.compare(Password, admin.Password)

        if (!passwordCompare) {
            return res.status(400).json({ success: false, Message: "Email or Password is Incorrect" })
        }

        const Payload = {
            admin: {
                id: admin.id,
            }
        }
        const AdminBizzToken = jwt.sign(Payload, JWT_KEY);
        success = true;
        res.json({ success, AdminBizzToken })

    } catch (error) {
        console.error(error)
        res.status(500).send({ success: false, Message: 'Error occured' })
    }
})


router.get("/getadmin", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        res.json({ success: true, adminData: admin });

    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }
})

// Update a Testimonial
router.put("/updateadmin", fetchadmin, PhotosUploader.single('profimg'), async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const { Email, Name, Phone } = req.body;
        let path = req.file ? req.file.path : null;

        const updatedAdmin = {
            Name,
            ProfilePhoto: path,
            Phone,
            Email,
        };

        admin = await Admin.findByIdAndUpdate(req.admin.id, updatedAdmin, { new: true });

        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        res.json({ success: true, message: 'Admin updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});



//Forget Password
router.post("/SendOTPemail", async (req, res) => {
    try {
        const { email } = req.body;

        // Fetch user data by userID
        const admin = await Admin.findOne({ Email: email });


        if (!admin) {
            res.json({
                success: false,
                message: "No User with this Email"
            });
            return;
        }

        await Adminotps.deleteMany({ AdminID: admin._id });


        // Send new OTP email
        await sendOTPEmail(admin._id, email);

        const Payload = {
            admin: {
                id: admin.id,
            }
        }
        const AdminBizzToken = jwt.sign(Payload, JWT_KEY);

        res.json({
            success: true,
            AdminBizzToken: AdminBizzToken,
            message: "OTP Sent Successfully"
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});

router.post("/verifyOTP", fetchadmin, async (req, res) => {
    try {
        let { otp } = req.body;
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }
        const adminID = req.admin.id;
        if (!adminID || !otp) {
            res.json({
                status: "Failed",
                message: "Empty otp details are not allowed"
            });
        } else {
            const otpVerification = await Adminotps.findOne({ AdminID: adminID });

            if (!otpVerification) {
                res.json({
                    success: false,
                    message: "Account record doesn't exist"
                });
            } else {
                const { expireAt } = otpVerification;
                const hashedOTP = otpVerification.OTP;

                if (expireAt < new Date()) {
                    await Adminotps.deleteMany({ AdminID: adminID });
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
                        await Adminotps.deleteMany({ AdminID: adminID });

                        res.json({
                            success: true,
                            message: "OTP Verified"
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

router.put("/ChangePassword", fetchadmin, async (req, res) => {
    try {
        const { newPassword } = req.body;


        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password in MongoDB
        admin.Password = hashedNewPassword;
        await admin.save();

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});



//PROMPTS
// Create a prompt
router.post("/createPrompt", fetchadmin, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const { Department, Name, Category, Potential, Type, Info, PromptsList, TipsList } = req.body;

        const newPrompt = new Prompts({
            Department,
            Name,
            Category,
            Potential,
            Type,
            Info,
            PromptsList,
            TipsList
        });

        await newPrompt.save();

        res.json({ success: true, message: 'Prompt created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// Get all prompts
router.get("/getPrompts", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }
        const prompts = await Prompts.find();
        res.json({ success: true, prompts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// Get a prompt by ID
router.get("/getPrompt/:id", fetchadmin, async (req, res) => {
    try {
        const id = req.params.id;
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }
        const prompt = await Prompts.findById(id);
        res.json({ success: true, prompt });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// Update a prompt
router.put("/updatePrompt/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const updatedPrompt = req.body;

        const prompt = await Prompts.findByIdAndUpdate(req.params.id, updatedPrompt, { new: true });

        if (!prompt) {
            return res.status(404).json({ success: false, message: 'Prompt not found' });
        }

        res.json({ success: true, message: 'Prompt updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// Delete a prompt
router.delete("/deletePrompt/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const prompt = await Prompts.findByIdAndDelete(req.params.id);

        if (!prompt) {
            return res.status(404).json({ success: false, message: 'Prompt not found' });
        }

        res.json({ success: true, message: 'Prompt deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});



// Create a FAQ
router.post("/createFAQ", fetchadmin, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const { Question, Answer } = req.body;

        const newFAQ = new FAQ({
            Question,
            Answer
        });

        await newFAQ.save();

        res.json({ success: true, message: 'FAQ created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// Get all FAQs
router.get("/getFAQs", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }
        const faqs = await FAQ.find();
        res.json({ success: true, faqs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// Get all FAQs
router.get("/getFAQ/:id", fetchadmin, async (req, res) => {
    try {
        const id = req.params.id;
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }
        const faq = await FAQ.findById(id);
        res.json({ success: true, faq });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// Update a FAQ
router.put("/updateFAQ/:id", fetchadmin, async (req, res) => {
    try {
        const { Question, Answer } = req.body;

        const updatedFAQ = {
            Question,
            Answer
        };

        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const faq = await FAQ.findByIdAndUpdate(req.params.id, updatedFAQ, { new: true });

        if (!faq) {
            return res.status(404).json({ success: false, message: 'FAQ not found' });
        }

        res.json({ success: true, message: 'FAQ updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// Delete a FAQ
router.delete("/deleteFAQ/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const faq = await FAQ.findByIdAndDelete(req.params.id);

        if (!faq) {
            return res.status(404).json({ success: false, message: 'FAQ not found' });
        }

        res.json({ success: true, message: 'FAQ deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});



router.post("/createuser", fetchadmin, async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        let user = await User.findOne({ Email: req.body.Email })
        if (user) {
            return res.status(404).json({ success, message: "This Email already exist" })
        }


        user = await User.create({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Phone: req.body.Phone,
            Status: "Active",
            User_Type: "Owner",
            ActiveUsed:false,
        })


        let company = await Company.create({
            CompanyName: req.body.Company,
            Owner_ID: user._id
        })

        const mailOptions = {
            from: "no-reply@earn4views.com",
            to: req.body.Email,
            subject: "Congratulation! Your account Created",
            html: `<p>Hi ${user.FirstName + " " + user.LastName},</p>
<p>Your new account has been created as ${user.FirstName + " " + user.LastName}.</p>
<p>Please create your password on below link </p>
    <a href="http://localhost:5174/createpassword/${user._id}" target="_blank">Create Password</a>
    <p>Thank you!</p>
  

    <p>This is an automated email. Do not reply to this email.</p>`,
        };
        await transporter.sendMail(mailOptions);


        success = true;
        res.json({ success, message: "Email send to user for password creation" })

    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }
})


//GetUserList
router.get("/getUsers", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        // Get all users with User_Type as "Owner"
        const owners = await User.find({ User_Type: "Owner" });

        // Loop through each owner to get their subusers and company data
        const ownersWithDetails = await Promise.all(owners.map(async (owner) => {
            const subusers = await SubUser.find({ User_ID: owner._id }).populate('Own_ID');
            const company = await Company.findOne({ Owner_ID: owner._id });

            console.log(owner)

            return {
                owner,
                subusers: subusers.map(subuser => subuser.Own_ID),
                company
            };
        }));

        res.json({ success: true, owners: ownersWithDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

router.get("/getLatestUsers", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        // Get the latest 10 users sorted by creation date
        const latestUsers = await User.find().sort({ createdAt: -1 }).limit(10);

        // Loop through each user and find their subusers
        const usersWithSubusers = await Promise.all(latestUsers.map(async (user) => {
            // Find subusers of the current user
            const subusers = await SubUser.find({ User_ID: user._id });
            // Return user object along with subusers
            return { user, subusers };
        }));

        res.json({ success: true, users: usersWithSubusers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

router.get('/user-registrations', async (req, res) => {
    try {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
        sixMonthsAgo.setDate(1);  // Set to the first day of the month for consistency

        const result = await User.aggregate([
            {
                $match: {
                    date: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m", date: "$date" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id": 1 }
            }
        ]);

        const currentMonth = new Date();
        currentMonth.setDate(1);  // Set to the first day of the current month
        const sixMonthsAgoMonth = new Date();
        sixMonthsAgoMonth.setMonth(currentMonth.getMonth() - 5);
        sixMonthsAgoMonth.setDate(1);

        const monthsMap = {};
        let cursorMonth = new Date(sixMonthsAgoMonth);

        while (cursorMonth <= currentMonth) {
            const key = cursorMonth.toISOString().slice(0, 7);
            monthsMap[key] = 0;
            cursorMonth.setMonth(cursorMonth.getMonth() + 1);
        }

        const formattedResult = Object.entries(monthsMap).map(([month, count]) => ({
            month,
            registrations: result.find(entry => entry._id === month)?.count || count
        }));

        res.json(formattedResult);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/department-percentage', async (req, res) => {
    try {
        const totalChats = await Chat.countDocuments();

        if (totalChats === 0) {
            return res.json({ message: "No chats found", data: [] });
        }

        const departmentCounts = await Chat.aggregate([
            {
                $group: {
                    _id: "$Department",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    department: "$_id",
                    count: 1,
                    percentage: { $multiply: [{ $divide: ["$count", totalChats] }, 100] }
                }
            },
            {
                $sort: { count: -1 } // Sort by count in descending order (optional)
            }
        ]);

        res.json(departmentCounts);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.delete("/deleteuser/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'FAQ not found' });
        }

        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});



router.get("/getEmails", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const email = await Emails.find();

        res.json({ success: true, email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

router.put("/updateemail/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const emails = await Emails.findByIdAndUpdate(req.params.id, { Status: "InActive" });

        if (!emails) {
            return res.status(404).json({ success: false, message: 'Email not found' });
        }

        res.json({ success: true, message: 'Email Updated Successs' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});


module.exports = router