const documentService = require('../service/documentService')

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
    getDocument
}