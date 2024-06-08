const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubuserSchema = new Schema({
    User_ID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    Company_ID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'
    },
    Own_ID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const SubUser = mongoose.model("SubUser", SubuserSchema)
module.exports = SubUser