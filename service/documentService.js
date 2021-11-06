const errorMiddleware = require('../middleware/errorMiddleware')
const Document = require("../models/document");
const User = require("../models/user");
const uuid = require('uuid');

const createDocument = async (userId) => {
    const user = await User.findOne({_id: userId})

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

const findDocument = async (link) => {
    const document = await Document.findOne({link: link})

    if (!document) errorMiddleware.throwError('Document with this id doesn\'t exist')
    return document
}

module.exports = {
    createDocument,
    findDocument
}