const mongoose = require('mongoose');
const { Schema } = mongoose;

const CompanySchema = new Schema({
    CompanyName: {
        type: String,
    },
    Address:{
        type:String
    },
    CompanyMoto:{
        type:String
    },
    NumEmployee:{
        type:String
    },
    CompanySell:{
        type:String
    },
    ContactEmail:{
        type:String,
    },
    CollectiveAgreement:{
        type:String
    },
    Customers:{
        type:String
    },
    Struture:{
        type:String
    },
    dailyoperation:{
        type:String
    },
    rules:{
        type:String
    },
    communication:{
        type:String
    },
    questions:{
        type:String
    },
    feedback:{
        type:String
    },
    Owner_ID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    date:{
        type:Date,
        default:new Date()
    },
})

const Company = mongoose.model("Company", CompanySchema)
module.exports = Company