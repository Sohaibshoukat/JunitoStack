const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    FirstName: {
        type: String,
    },
    LastName: {
        type: String,
    },
    Email: {
        type: String,
        unique: true
    },
    Phone: {
        type: String,
    },
    Age: {
        type: String,
    },
    Gender: {
        type: String,
        enum:["Male","Female"]
    },
    ProfilePhoto: {
        type: String,
    },
    Password: {
        type: String
    },
    Status: {
        type: String,
        enum: ["Active", "InActive"]
    },
    ActiveUsed: {
        type: Boolean
    },
    User_Type:{
        type: String,
        enum: ["Owner", "SubUser"]
    },
    Is_Verfied: {
        type: Boolean,
        default: false
    },
    date:{
        type:Date,
        default:new Date()
    },
})

const User = mongoose.model("User", UserSchema)
module.exports = User