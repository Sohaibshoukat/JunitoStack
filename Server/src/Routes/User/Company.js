const express = require("express");
const router = express.Router();
const fetchuser = require('../../Middleware/Fetchuser')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const multer = require('multer');

const User = require("../../Models/User");
const Company = require("../../Models/Company");
const SubUser = require("../../Models/SubUser");
const Prompts = require("../../Models/Prompts");
const FAQ = require("../../Models/FAQ");
const PromptImages = require("../../Models/PromptImags");
const Transaction = require("../../Models/Transaction");


const upload = multer({ storage: multer.memoryStorage() });

const JWT_KEY = process.env.JWT_KEY;


const PhotosStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './src/Uploads/UserProfile');
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

const sendOTPEmail = async (id, FirstName, LastName, Password, email, res) => {
    try {

        const mailOptions = {
            from: "no-reply@junito.at",
            to: email,
            subject: `Verify Your Email`,
            html: `<p>${FirstName} ${LastName} invited you to join Junito Platform for your company needs</p>
            <br/>
            <h2>You can Login using below Credentials</h2>
            <p><span>Email: </span>${email}</p>
            <p><span>Password: </span>${Password}</p>
            `
        }

        await transporter.sendMail(mailOptions)

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
            return res.json({ success: false, message: "You Have no Access" });
        }

        let company = await Company.findOne({ Owner_ID: req.user.id })
        if (!company) {
            return res.json({ success: false, message: "No Company Registerd Found" });
        }

        let user = await User.findOne({ Email: req.body.Email })
        if (user) {
            return res.json({ success, message: "This Email already exist" })
        }


        const Salt = await bcrypt.genSalt(10);
        const SecPassword = await bcrypt.hash(req.body.Password, Salt)

        user = await User.create({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Phone: req.body.Phone,
            Is_Verfied: true,
            User_Type: "SubUser",
            Status: "Active",
            Password: SecPassword
        })

        let subuser = await SubUser.create({
            User_ID: req.user.id,
            Company_ID: company._id,
            Own_ID: user._id,
        })


        let transaction = await Transaction.findOne({ User_ID: req.user.id });

        if (transaction.subUsers.length <= 0) {
            transaction.subUsers.push({
                User: user._id,
                Status: "Paid",
                DateCreated: new Date().toISOString(),
                ExpiryDate: transaction.Plan === 'Monthly' ? new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString() : new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
            })
            transaction.save()
        } else {
            transaction.subUsers.push({
                User: user._id,
                Status: "UnPaid"
            })
            transaction.save()
        }


        const response = await sendOTPEmail(user._id, owner.FirstName, owner.LastName, req.body.Password, req.body.Email, res);


        success = true;
        res.json({ success: true })

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
        const owner = await User.findById(req.user.id);
        if (!owner) {
            return res.status(404).json({ success: false, message: "You have no access" });
        }

        const subuserId = req.params.subuserId;

        let subuser = await SubUser.findById(subuserId);
        if (!subuser) {
            return res.status(404).json({ success: false, message: "Subuser not found" });
        }

        if (subuser.User_ID.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "You do not have permission to delete this subuser" });
        }

        // Decrement the amount by 50 for transactions with status "Paid"
        await Transaction.updateMany(
            { "subUsers.User": subuserId, Status: "Paid" },
            { $inc: { Amount: -50 } }
        );

        // Remove the subuser from the subUsers array for all transactions
        const result = await Transaction.updateMany(
            { "subUsers.User": subuserId },
            { $pull: { subUsers: { User: subuserId } } }
        );


        // Delete the subuser and the user
        const user = await User.findByIdAndDelete(subuser.Own_ID);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        subuser = await SubUser.findByIdAndDelete(subuserId);
        if (!subuser) {
            return res.status(404).json({ success: false, message: "Subuser not found" });
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});


router.put("/statusSubuser/:subuserId", fetchuser, async (req, res) => {
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

        if (user.Status == "Active") {
            user.Status = "InActive";
        } else {
            user.Status = "Active";
        }


        await user.save();

        success = true;
        res.json({ success });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

router.get('/subUser', fetchuser, async (req, res) => {
    try {
        let owner = await User.findById(req.user.id);
        if (!owner) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        // Get the sub-users
        let subUsers = await SubUser.find({ User_ID: req.user.id })
            .populate('Own_ID', 'FirstName LastName Email Phone ProfilePhoto Status');

        // Get transactions for the user
        let transactions = await Transaction.find({ User_ID: req.user.id });

        // Map through subUsers to add status from transactions
        let subUserDetails = subUsers.map(subUser => {
            let transaction = transactions.find(tr =>
                tr.subUsers.some(su => su.User.equals(subUser.Own_ID._id))
            );

            // Get the status of the subUser from the transaction
            let status = transaction ?
                transaction.subUsers.find(su => su.User.equals(subUser.Own_ID._id)).Status :
                'No Transaction';

            return {
                ...subUser._doc,
                TransactionStatus: status
            };
        });

        res.send({ success: true, SubUsers: subUserDetails });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/subUser/:id', fetchuser, async (req, res) => {
    try {
        let owner = await User.findById(req.user.id);
        if (!owner) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        let user = await SubUser.findById(req.params.id).populate('Own_ID', 'FirstName LastName Email Phone ProfilePhoto Status')

        res.send({ success: true, SubUser: user });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/subUsers/List', fetchuser, async (req, res) => {
    try {
        let owner = await User.findById(req.user.id);
        if (!owner) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        let users = await SubUser.find({ User_ID: req.user.id }).populate('Own_ID', 'FirstName LastName Email Status').limit(5);

        res.send({ success: true, SubUsers: users });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});



router.get('/promptofday', async (req, res) => {
    try {
        // Count the total number of prompts in the database
        const count = await Prompts.countDocuments();

        // Generate a random index
        const randomIndex = Math.floor(Math.random() * count);

        // Fetch a single random prompt using the random index
        const randomPrompt = await Prompts.findOne().skip(randomIndex);

        const images = await PromptImages.find({ Department: randomPrompt.Department });


        const randomIndex2 = Math.floor(Math.random() * 10);


        res.send({ prompt: randomPrompt, image: images[randomIndex2] });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
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

        res.send({ success: true, Prompts: formattedData });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/departPrompt/:department', async (req, res) => {
    try {
        const department = req.params.department;

        // Fetch data based on department
        const data = await Prompts.aggregate([
            { $match: { Department: department } }, // Filter by department
            { $sample: { size: 10 } } // Retrieve 10 random documents
        ]);

        // Assuming you have an array of 10 image URLs
        const imageUrls = [
            "https://example.com/image1.jpg",
            "https://example.com/image2.jpg",
            "https://example.com/image2.jpg",
            "https://example.com/image2.jpg",
            "https://example.com/image2.jpg",
            "https://example.com/image2.jpg",
            "https://example.com/image2.jpg",
            "https://example.com/image2.jpg",
            "https://example.com/image2.jpg",
            "https://example.com/image2.jpg",
        ];

        // Combine each prompt with an image URL
        const promptsWithImages = data.map((prompt, index) => ({
            ...prompt.toObject(),
            imageUrl: imageUrls[index] // Add an image URL to each prompt
        }));

        res.send({ success: true, Prompts: promptsWithImages });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/promptdetail/:prompid', async (req, res) => {
    try {

        // Fetch data based on department
        const prompt = await Prompts.findById(req.params.prompid);

        res.send({ success: true, Prompt: prompt });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/faq', async (req, res) => {
    try {
        // Fetch data based on department
        const data = await FAQ.find();
        res.send({ success: true, FAQ: data });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});


router.get('/promptsrandom/:department', async (req, res) => {
    try {
        const department = req.params.department;

        // Find 10 random prompts for the given department
        const prompts = await Prompts.aggregate([
            { $match: { Department: department } },
            { $sample: { size: 10 } }
        ]);

        // Find the corresponding images for the department
        const images = await PromptImages.find({ Department: department });

        // Assign each prompt an image
        const result = await prompts.map((prompt, index) => {
            const imageIndex = index % images.length;
            return {
                ...prompt,
                Image: images[imageIndex].Src,
            };
        });

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.get('/random', async (req, res) => {
    try {
        const departments = ["HR", "Marketing", "Vertrieb", "Support", "Agentur", "Startup"];
        const randomPrompts = {};

        for (const department of departments) {
            const prompts = await Prompts.aggregate([
                { $match: { Department: department } },
                { $sample: { size: 1 } }
            ]);
            randomPrompts[department] = prompts[0] || null;
        }

        res.json(randomPrompts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router
