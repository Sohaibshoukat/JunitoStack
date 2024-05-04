const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChatSchema = new Schema({
    Title: {
        type: String,
    },
    User_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Department: {
        type: String,
    },
    Date: {
        type: Date,
        default: new Date()
    },
    ChatConversation: [
        {
            Type: {
                type: String,
                enum: ["User", "BizzBot"]
            },
            Query: {
                type: String,
            },
            TimeStamp: {
                type: Date,
                default: new Date()
            }
        }
    ]
})

const Chat = mongoose.model("Chat", ChatSchema)
module.exports = Chat