const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminEmailOtpSchema = new Schema({
    AdminID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin'
    },
    OTP:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date
    },
    expireAt:{
        type:Date
    }

})

const Adminotps =mongoose.model("Adminotps",AdminEmailOtpSchema)
module.exports = Adminotps