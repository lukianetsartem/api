const Document = require("../models/document");
const User = require("../models/user");
const uuid = require('uuid');

const createDocument = async (userId) => {
    const user = await User.findOne({_id:userId})

    const newDocument = new Document({
        title: 'Untitled',
        emoji: '',
        cover: '',
        link: uuid.v4(),
        elements: []
    })

    user.documents.push(newDocument)
    user.save()
    return newDocument
}

module.exports = {
    createDocument
}