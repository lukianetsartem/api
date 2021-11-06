const Document = require("../models/document");
const User = require("../models/user");
const uuid = require('uuid');

const createDocument = async (userId) => {
    const user = await User.findOne({_id:userId})

    const newDocument = await Document.create({
        title: 'Untitled',
        emoji: '',
        cover: '',
        link: uuid.v4(),
        elements: [],
        ownerId: userId
    })

    user.documents.push(newDocument.link)
    user.save()

    return newDocument
}

module.exports = {
    createDocument
}