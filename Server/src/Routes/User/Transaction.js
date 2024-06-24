const express = require("express");
const router = express.Router();
const fetchuser = require('../../Middleware/Fetchuser')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../../Models/User");
const Transaction = require("../../Models/PaymentTrack");


const JWT_KEY = process.env.JWT_KEY;


router.post('/registertransactions', fetchuser, async (req, res) => {
    try {
        let userid = req.user.id;
        const user = await User.findById(userid)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const transaction = new Transaction.create({
            UserID: userid,
            Company_ID: req.body.Company_ID,
            type: req.body.type,
            TransactionId:TransactionId,
            PaymentMade: req.body.Amount,
            ExpiryDate: req.body.ExpiryDate,
            CreationDate: req.body.CreationDate
        });
        res.status(201).send({ success: true, transaction });
    } catch (error) {
        res.status(400).send(error);
    }
});


router.put('/addSubUser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const { transactionId, subUserId } = req.body;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the transaction exists
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }

        // Add the sub-user to the SubUsers array
        if (!transaction.SubUsers.includes(subUserId)) {
            transaction.SubUsers.push(subUserId);
        } else {
            return res.status(400).json({ success: false, message: "Sub-user already exists in the transaction" });
        }

        // Save the updated transaction
        await transaction.save();

        res.status(200).json({ success: true, transaction });
    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
});




module.exports = router
