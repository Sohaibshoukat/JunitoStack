const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
    Name: {
        type: String,
    },
    Email: {
        type: String,
        unique: true
    },
    Phone:{
        type:String,
    },
    ProfilePhoto: {
        type: String,
    },
    Password: {
        type: String
    }
})

const Admin = mongoose.model("Admin", AdminSchema)
module.exports = Admin