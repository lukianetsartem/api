const mongoose = require('mongoose');

const string = {type: String, required: false}
const requiredString = {type: String, required: true}

const elementSchema = new mongoose.Schema({
    value: string,
    category: requiredString,
    type: requiredString,
    placeholder: requiredString,
    isChecked: {type: Boolean, required: false}
})

module.exports = mongoose.model('Element', elementSchema)