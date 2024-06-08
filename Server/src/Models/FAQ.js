const mongoose = require('mongoose');
const { Schema } = mongoose;

const FAQSchema = new Schema({
    Question: {
        type: String,
    },
    Answer: {
        type: String,
    }
})

const FAQ = mongoose.model("FAQ", FAQSchema)
module.exports = FAQ