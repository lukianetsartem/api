const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth')

router.post('/sign-up', authController.signUp)

router.post('/sign-in', authController.signIn)

router.post('/logout', authController.logout)

router.post('/refresh', authController.refresh)

module.exports = router