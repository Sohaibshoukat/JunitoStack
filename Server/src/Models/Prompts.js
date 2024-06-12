const mongoose = require('mongoose');
const { Schema } = mongoose;

const PromptSchema = new Schema({
    Department:{
        type:String,
    },
    Name:{
        type:String,
    },
    Category:{
        type:String,
    },
    Potential:{
        type: String,
        enum: ["Premium", "High", "Medium", "Low"]
    },
    Type:{
        type:String,
    },
    Info:{
        type:String,
    },
    PromptsList: [
        {
            value: {
                type: String,
            }
        }
    ],
    TipsList: [
        {
            value: {
                type: String,
            }
        }
    ],
})

const Prompts =mongoose.model("Prompts",PromptSchema)
module.exports = Prompts