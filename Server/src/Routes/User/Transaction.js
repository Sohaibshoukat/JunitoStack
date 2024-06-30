const express = require("express");
const router = express.Router();
const fetchuser = require('../../Middleware/Fetchuser')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../../Models/User");
const Company = require("../../Models/Company");
const Transaction = require("../../Models/Transaction");
const PromoCode = require("../../Models/PrompoCode");


const JWT_KEY = process.env.JWT_KEY;


router.post('/registertransactions', async (req, res) => {
    try {
        let userid = req.body.id;
        console.log(req.body)
        const user = await User.findById(userid)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const company = await Company.findOne({ Owner_ID: userid })
        if (!company) {
            return res.status(404).json({ success: false, message: "Company not found" });
        }

        const transaction = await Transaction.findOneAndUpdate({ User_ID: userid }, {
            Amount: req.body.Amount,
            DateCreated: req.body.DateCreated,
            ExpiryDate: req.body.ExpiryDate,
            Status: req.body.Status
        }, { new: true });


        res.status(200).send({ success: true, transaction });
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
});


router.put('/SubUserAdd', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const { subUserId } = req.body;

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

        // Find the subuser in the transaction
        const subUser = transaction.subUsers.find(su => su.User.toString() === subUserId);
        if (!subUser) {
            return res.status(404).json({ success: false, message: "SubUser not found" });
        }

        // Update the status of the subuser to "Paid"
        subUser.Status = "Paid";

        subUser.DateCreated = req.body.DateCreated;
        subUser.ExpiryDate = req.body.ExpiryDate
        // Add 50 to the transaction amount
        transaction.Amount = (parseFloat(transaction.Amount) + 50).toString();

        // Save the updated transaction
        await transaction.save();

        res.status(200).json({ success: true, transaction });
    } catch (error) {
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
        const promoCode = await PromoCode.findOne({PromoCode:req.params.promocode});
        if (!promoCode) {
            return res.status(404).json({ success: false, message: "Promo code not found" });
        }

        if (promoCode.ExpiryDate==new Date()) {
            return res.status(404).json({ success: false, message: "This Promotion is Expired Know" });
        }



        res.status(200).json({ success: true, data: promoCode });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

module.exports = router
