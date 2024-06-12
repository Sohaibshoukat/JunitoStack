const mongoose = require('mongoose');
const { Schema } = mongoose;

const PromptImagesSchema = new Schema({
    Department:{
        type:String,
    },
    Src:{
        type:String,
    },
})

const PromptImages =mongoose.model("PromptImages",PromptImagesSchema)
module.exports = PromptImages