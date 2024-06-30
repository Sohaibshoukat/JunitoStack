const mongoose = require('mongoose');
const { Schema } = mongoose;

const PromoCodeSchema = new Schema({
    Heading:{
        type:String
    },
    OffPercentage:{
        type:Number,
    },
    PromoCode:{
        type:String,
        unique:true
    },
    ExpiryDate:{
        type:Date,
    },
    CreationDate:{
        type:Date,
        default:new Date()
    }
})

const PromoCode = mongoose.model("PromoCode", PromoCodeSchema)
module.exports = PromoCode