const mongoose = require('mongoose');
const { Schema } = mongoose;

const ToDosSchema = new Schema({
    Title: {
        type: String,
    },
    Description: {
        type: String,
    },
    Priority: {
        type: String,
        enum: ["High", "Medium", "Low"]
    },
    Deadline: {
        type: Date,
    },
    subUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    User_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    Chat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    Date: {
        type: Date,
        default: new Date()
    },
    Status:{
        type:String,
        enum:["Pending","Completed"]
    }
})

const ToDos = mongoose.model("ToDos", ToDosSchema)
module.exports = ToDos