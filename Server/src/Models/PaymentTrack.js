const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransactionSchema = new Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    TransactionId:{
        type:String
    },
    SubUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    Company_ID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'
    },
    type:{
        type:String,
        enum:["Monthly","Yearly"]
    },
    PaymentMade:{
        type:Number,
    },
    ExpiryDate:{
        type:Date,
    },
    CreationDate:{
        type:Date,
    }
})

const Transaction = mongoose.model("Transaction", TransactionSchema)
module.exports = Transaction