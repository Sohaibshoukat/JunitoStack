const mongoose = require('mongoose');
const { Schema } = mongoose;

const CompanySchema = new Schema({
    CompanyName: {
        type: String,
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