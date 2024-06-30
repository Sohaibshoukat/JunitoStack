const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransactionSchema = new Schema({
    User_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Company_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    subUsers: [
        {
            User: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            Status: {
                type: String,
                enum: ["Paid", "UnPaid"]
            },
            DateCreated: {
                type: Date,
            },
            ExpiryDate: {
                type: Date
            },
        }
    ],
    Amount: {
        type: String,
    },
    DateCreated: {
        type: Date,
    },
    ExpiryDate: {
        type: Date
    },
    Status: {
        type: String,
        enum: ["Paid", "UnPaid"]
    }
})

const Transaction = mongoose.model("Transaction", TransactionSchema)
module.exports = Transaction