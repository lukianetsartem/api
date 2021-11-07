const errorMiddleware = require('../middleware/errorMiddleware');
const Document = require("../models/document");
const Element = require('../models/element');
const User = require("../models/user");
const List = require("collections/list");
const uuid = require('uuid');

const createDefaultElement = () => {
    return new Element({
        value: "",
        category: 'TEXT',
        type: "TEXT",
        placeholder: 'Type \'/\' for commands'
    })
}

const strategies = {
    DEFAULT: createDefaultElement()
}

const createElementByType = (type) => {
    return strategies[type]
}

const createDocument = async (userId) => {
    const user = await User.findOne({_id: userId})

    const initialElement = createElementByType("DEFAULT")
    const newDocument = await Document.create({
        title: 'Untitled',
        emoji: '',
        cover: '',
        link: uuid.v4(),
        elements: [initialElement],
        ownerId: userId
    })

    user.documents.push(newDocument._id)
    user.save()

    return newDocument
}

const createElement = async (userId, documentId, prevElement) => {
    const user = await User.findOne({_id: userId})

    // Checking if document exist
    const document = await Document.findOne({_id: documentId})
    if(!document) errorMiddleware.throwError('Document with provided id doesn\'t exist.')

    // Checking if provided user own provided document
    const doesUserOwnDocument = user.documents.find(d=> d.toString() === documentId)
    if(!doesUserOwnDocument) errorMiddleware.throwError('User doesn\'t own this document.')

    const elements = document.elements
    const prevElementIndex = elements.findIndex(e => e.id === prevElement.id)

    // Creating new element
    const newElement = createElementByType("DEFAULT")

    // Adding new element after provided element
    const updatedElements = new List(elements)
    updatedElements.splice(prevElementIndex, 1, prevElement, newElement)

    document.elements = updatedElements.toArray()
    document.save()

    return document
}

const findDocument = async (link) => {
    const document = await Document.findOne({link: link})

    if (!document) errorMiddleware.throwError('Document with this id doesn\'t exist')
    return document
}

module.exports = {
    createDocument,
    createElement,
    findDocument
}