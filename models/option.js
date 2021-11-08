const mongoose = require('mongoose');

const string = { type: String, required: true }

const optionSchema = new mongoose.Schema({
    title: string,
    subtitle: string,
    placeholder: string,
    category: string,
    type: string,
    cover: string
})

module.exports = mongoose.model('Option', optionSchema)