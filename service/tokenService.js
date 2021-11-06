const jwt = require('jsonwebtoken')
const Token = require('../models/token')

// Access and refresh tokens generator
const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})

    return {
        accessToken,
        refreshToken
    }
}

// Tokens provider
const getTokens = async (userData) => {
    const tokens = generateTokens(userData)
    await saveToken(userData.id, tokens.refreshToken)

    return tokens
}

// Token saver
const saveToken = async (userId, refreshToken) => {
    const tokenData = await Token.findOne({userId})

    if(tokenData) {
        tokenData.refreshToken = refreshToken
        return tokenData.save()
    }

    return await Token.create({userId, refreshToken})
}

// Token killer
const removeToken = async (refreshToken) => {
    await Token.deleteOne({refreshToken})
}

// Token finder
const findToken = (refreshToken) => {
    return Token.findOne({refreshToken})
}

// Token validator
const validateToken = (token, secret) => {
    try {
        return jwt.verify(token, secret)
    } catch (e) {
        return null
    }
}

module.exports = {
    generateTokens,
    getTokens,
    saveToken,
    removeToken,
    validateToken,
    findToken
}