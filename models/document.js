const mongoose = require('mongoose');

const string = {type: String, required: false}
const uniqueString = {type: String, required: true, unique: true}

const documentSchema = new mongoose.Schema({
    title: string,
    emoji: string,
    cover: string,
    link: uniqueString,
    elements: {type: Array, required: true},
    ownerId: uniqueString,
})

module.exports = mongoose.model('Document', documentSchema)