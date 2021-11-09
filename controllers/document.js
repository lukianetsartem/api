const documentService = require('../service/documentService')
const Section = require("../models/section");

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

// Change element type controller
const changeElementType = (req, res) => {
    const {documentId, elementId, type} =  req.body

    documentService.changeElementType(req.userId, documentId, elementId, type)
        .then(document => {
            res.status(201).json({
                message: 'Element type changed successfully.',
                document: document
            })
        })
        .catch(e => console.log(e))
}

const changeElementValue = (req, res) => {
    const {documentId, elementId, newValue} =  req.body

    documentService.changeElementValue(req.userId, documentId, elementId, newValue)
        .then(document => {
            res.status(201).json({
                message: 'Element type changed successfully.',
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

// Get menu controller
const getMenu = async (req, res) => {
    res.status(201).json({
        sections: await Section.find()
    })
}

module.exports = {
    addDocument,
    addElement,
    getDocument,
    changeElementType,
    changeElementValue,
    getMenu
}