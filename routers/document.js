const express = require('express')
const router = express.Router()
const documentController = require('../controllers/document')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/add-document', authMiddleware, documentController.addDocument)

router.post('/add-element', authMiddleware, documentController.addElement)

router.post('/change-element-type', authMiddleware, documentController.changeElementType)

router.get('/get-document/:id', documentController.getDocument)

router.get('/menu', documentController.getMenu)

module.exports = router