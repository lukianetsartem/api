const documentService = require('../service/documentService')

// Get documents controller
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

module.exports = {
    addDocument
}