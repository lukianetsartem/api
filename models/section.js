const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    section: {type: String, required: true},
    options: {type: Array, required: true},
})

module.exports = mongoose.model('Section', sectionSchema)