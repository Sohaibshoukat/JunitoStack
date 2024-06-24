const mongoose = require('mongoose');
const { Schema } = mongoose;

const SharedChatSchema = new Schema({
    User_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    Chat_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    Category:{
        type:String,
        enum:["HR","Marketing","Vertrieb", "Support","Startup","Sales","Agent"]
    },
    Date: {
        type: Date,
        default: new Date()
    }
})

const SharedChat = mongoose.model("SharedChat", SharedChatSchema)
module.exports = SharedChat