const errorMiddleware = require('../middleware/errorMiddleware');
const userService = require('../service/userService')
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

const createDocument = async (userId) => {
    const user = await User.findOne({_id: userId})

    const initialElement = createDefaultElement()
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
    const user = await userService.findUser(userId)
    // Verifying if user is owner of provided document
    const verifiedDocumentId = userService.doesUserOwnDocument(user, documentId)
    // Taking document from db
    const document = await findDocument(verifiedDocumentId)

    const elements = document.elements
    const prevElementIndex = elements.findIndex(e => e.id === prevElement.id)

    // Creating new element
    const newElement = createDefaultElement()

    // Adding new element after provided element
    const updatedElements = new List(elements)
    updatedElements.splice(prevElementIndex, 1, prevElement, newElement)

    document.elements = updatedElements.toArray()
    document.save()

    return document
}

// Element type changing strategies
const toText = (element) => {
    return {
        value: element.value,
        category: "TEXT",
        type: "TEXT",
        placeholder: "Type \'/\' for commands",
        _id: element._id
    }
}
const toBigHeading = (element) => {
    return {
        value: element.value,
        category: "TEXT",
        type: "BIG_HEADING",
        placeholder: "Heading 1",
        _id: element._id
    }
}
const toMediumHeading = (element) => {
    return {
        value: element.value,
        category: "TEXT",
        type: "MEDIUM_HEADING",
        placeholder: "Heading 2",
        _id: element._id
    }
}
const toSmallHeading = (element) => {
    return {
        value: element.value,
        category: "TEXT",
        type: "SMALL_HEADING",
        placeholder: "Heading 3",
        _id: element._id
    }
}
const toToDo = (element) => {
    return {
        value: element.value,
        category: "TEXT",
        type: "TO_DO",
        placeholder: "To-do",
        isChecked: false,
        _id: element._id
    }
}
const toPicture = (element) => {
    return {
        value: element.value,
        category: "MEDIA",
        type: "PICTURE",
        placeholder: "Embed a picture by link",
        _id: element._id,
    }
}
const toVideo = (element) => {
    return {
        value: element.value,
        category: "MEDIA",
        type: "VIDEO",
        placeholder: "Embed a YouTube video",
        _id: element._id
    }
}

const strategies = {
    TEXT: toText,
    BIG_HEADING: toBigHeading,
    MEDIUM_HEADING: toMediumHeading,
    SMALL_HEADING: toSmallHeading,
    TO_DO: toToDo,
    PICTURE: toPicture,
    VIDEO: toVideo,
}

const changeType = (element, type) => {
    const strategy = strategies[type]
    return strategy(element)
}

const getDocumentFromDB = async (userId, documentId) => {
    // Getting user
    const user = await userService.findUser(userId)
    // Verifying if user is owner of provided document
    const verifiedDocumentId = userService.doesUserOwnDocument(user, documentId)
    // Taking document from db
    return await findDocument(verifiedDocumentId)
}

const checkId = (e, elementId) => e._id.toString() === elementId
const getElementFromDB = (document, elementId) => {
    const checkId = (e) => e._id.toString() === elementId
    return document.elements.find(e => checkId(e))
}

const changeElementType = async (userId, documentId, elementId, type) => {
    // Taking document from db
    const document = await getDocumentFromDB(userId, documentId)
    // Taking element from db
    const element = getElementFromDB(document, elementId)
    // Checking if provided type equal to exist type
    if (element.type === type) return document

    const newElement = changeType(element, type)
    document.elements = document.elements.map(e => checkId(e, elementId) ? newElement : e)
    document.save()

    return document
}

const changeElementValue = async (userId, documentId, elementId, newValue) => {
    // Taking document from db
    const document = await getDocumentFromDB(userId, documentId)
    // Taking element from db
    const element = getElementFromDB(document, elementId)
    // Checking if provided type equal to exist type
    if (element.value === newValue) return document

    // Replacing an old element with a new one
    const newElement = {...element, value: newValue}
    document.elements = document.elements.map(e => checkId(e, elementId) ? newElement : e)
    document.save()

    return document
}

const changeDocumentTitle = async (userId, documentId, newTitle) => {
    // Taking document from db
    const document = await getDocumentFromDB(userId, documentId)
    // Updating the title
    document.title = newTitle
    document.save()

    return document
}

const changeDocumentEmoji = async (userId, documentId, newEmoji) => {
    // Taking document from db
    const document = await getDocumentFromDB(userId, documentId)
    // Updating an emoji
    document.emoji = newEmoji
    document.save()

    return document
}

const changeDocumentCover = async (userId, documentId, newCover) => {
    // Taking document from db
    const document = await getDocumentFromDB(userId, documentId)
    // Updating the cover
    document.cover = newCover
    document.save()

    return document
}

const findDocument = async (documentId) => {
    const document = await Document.findOne({_id: documentId})
    if (!document) errorMiddleware.throwError('Document with provided id doesn\'t exist.')
    return document
}

module.exports = {
    createDocument,
    createElement,
    findDocument,
    changeElementType,
    changeElementValue,
    changeDocumentTitle,
    changeDocumentEmoji,
    changeDocumentCover
}