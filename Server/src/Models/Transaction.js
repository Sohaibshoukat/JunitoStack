const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransactionSchema = new Schema({
    User_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    SubscriptionID:{
        type:String,
    },
    Order_ID: {
        type:String,
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
            SubscriptionID:{
                type:String,
            },
            Order_ID: {
                type:String,
            },
        }
    ],
    Amount: {
        type: Number,
    },
    DateCreated: {
        type: Date,
    },
    ExpiryDate: {
        type: Date
    },
    Plan:{
        type:String,
        enum:["Monthly","Annually","AdminFree",""]
    },
    Status: {
        type: String,
        enum: ["Paid", "UnPaid"]
    }
})

const Transaction = mongoose.model("Transaction", TransactionSchema)
module.exports = Transaction