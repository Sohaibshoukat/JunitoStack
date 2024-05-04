const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmailSchema = new Schema({
    User_ID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    Email:{
        type:String,
        require:true
    },
    Company:{
        type:String,
    },
    Name:{
        type:String,
    },
    Subject:{
        type:String
    },
    date:{
        type:Date,
        default:new Date()
    },
    Status:{
        type:String,
        enum:["Active","InActive"]
    }

})

const Emails =mongoose.model("Emails",EmailSchema)
module.exports = Emails