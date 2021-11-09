const documentService = require('../service/documentService')
const Section = require("../models/section");

const sendResponse = (res, document, message) => {
    res.status(201).json({
        message: message,
        document: document
    })
}

const addDocument = (req, res) => {
    documentService.createDocument(req.userId)
        .then(document => {
            const message = 'Document created successfully.'
            sendResponse(res, document, message)
        })
        .catch(e => console.log(e))
}

const addElement = async (req, res) => {
    const {documentId, prevElement} = req.body

    documentService.createElement(req.userId, documentId, prevElement)
        .then(document => {
            const message = 'Element added successfully.'
            sendResponse(res, document, message)
        })
        .catch(e => console.log(e))
}

const changeElementType = (req, res) => {
    const {documentId, elementId, type} = req.body

    documentService.changeElementType(req.userId, documentId, elementId, type)
        .then(document => {
            const message = 'Element type changed successfully.'
            sendResponse(res, document, message)
        })
        .catch(e => console.log(e))
}

const changeElementValue = (req, res) => {
    const {documentId, elementId, newValue} = req.body

    documentService.changeElementValue(req.userId, documentId, elementId, newValue)
        .then(document => {
            const message = 'Element value changed successfully.'
            sendResponse(res, document, message)
        })
        .catch(e => console.log(e))
}

const changeDocumentTitle = (req, res) => {
    const {documentId, newTitle} = req.body

    documentService.changeDocumentTitle(req.userId, documentId, newTitle)
        .then(document => {
            const message = 'Document title changed successfully.'
            sendResponse(res, document, message)
        })
        .catch(e => console.log(e))
}

const changeDocumentEmoji = (req, res) => {
    const {documentId, newEmoji} = req.body

    documentService.changeDocumentTitle(req.userId, documentId, newEmoji)
        .then(document => {
            const message = 'Document emoji changed successfully.'
            sendResponse(res, document, message)
        })
        .catch(e => console.log(e))
}

const changeDocumentCover = (req, res) => {
    const {documentId, newCover} = req.body

    documentService.changeDocumentTitle(req.userId, documentId, newCover)
        .then(document => {
            const message = 'Document cover changed successfully.'
            sendResponse(res, document, message)
        })
        .catch(e => console.log(e))
}

const getDocument = (req, res) => {
    documentService.findDocument(req.params.id)
        .then(document => {
            res.status(201).json({
                document: document
            })
        })
        .catch(e => console.log(e))
}

const getDocuments = (req, res) => {
    documentService.findDocuments(req.userId)
        .then(documents => {
            res.status(201).json({
                documents: documents
            })
        })
        .catch(e => console.log(e))
}

const getMenu = async (req, res) => {
    res.status(201).json({
        sections: await Section.find()
    })
}

module.exports = {
    getMenu,
    getDocument,
    addDocument,
    getDocuments,
    addElement,
    changeElementType,
    changeElementValue,
    changeDocumentTitle,
    changeDocumentEmoji,
    changeDocumentCover
}