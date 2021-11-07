const documentService = require('../service/documentService')
const User = require("../models/user");

// Add document controller
const addDocument = (req, res) => {
    documentService.createDocument(req.userId)
        .then(document => {
            res.status(201).json({
                message: 'Document created successfully.',
                document: document
            })
        })
        .catch(e => console.log(e))
}

// Add document element controller
const addElement = async (req, res) => {
    const {documentId, prevElement} =  req.body

    documentService.createElement(req.userId, documentId, prevElement)
        .then(document => {
            res.status(201).json({
                message: 'Element added successfully.',
                document: document
            })
        })
        .catch(e => console.log(e))
}

// Get document controller
const getDocument = (req, res) => {
    documentService.findDocument(req.params.id)
        .then(document => {
            res.status(201).json({
                document: document
            })
        })
        .catch(e => console.log(e))
}

module.exports = {
    addDocument,
    addElement,
    getDocument
}