const express = require('express')
const router = express.Router()
const documentController = require('../controllers/document')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/add-document', authMiddleware, documentController.addDocument)

router.get('/get-document/:id', documentController.getDocument)

module.exports = router