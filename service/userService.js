const bcrypt = require('bcrypt')
const tokenService = require('../service/tokenService')
const errorMiddleware = require('../middleware/errorMiddleware')
const User = require('../models/user')

// Account creating service
const registration = async (login, email, password) => {
    const isExist = await User.findOne({email} || {login})
    if (isExist) errorMiddleware.throwError('User with the same login or email is already exist, please select another.')

    const hashedPassword = await bcrypt.hash(password, 0)

    const user = await User.create({
        login: login,
        email: email,
        password: hashedPassword,
        documents: []
    })

    const userData = {id: user._id}
    const tokens = await tokenService.getTokens(userData)

    return {...tokens, user: userData}
}

// Session creating service
const login = async (email, password) => {
    const user = await User.findOne({email})
    if (!user) errorMiddleware.throwError('User with provided email doesn\'t exist.')

    const isRightCredentials = await bcrypt.compare(password, user.password)
    if (!isRightCredentials) errorMiddleware.authError()

    const userData = {id: user._id}
    const tokens = await tokenService.getTokens(userData)

    return {...tokens, user: userData}
}

// Session expiring service
const logout = async (refreshToken) => {
    await tokenService.removeToken(refreshToken)
}

// User finding service
const findUser = async (userId) => {
    const user = await User.findOne({_id: userId})
    if(!user) errorMiddleware.throwError('User doesn\'t exist')
    return user
}

// Does user own provided document
const doesUserOwnDocument = (user, documentId) => {
    const doesOwn = user.documents.find(d=> d.toString() === documentId)
    if(!doesOwn) errorMiddleware.throwError('User doesn\'t own this document.')
    return doesOwn
}

module.exports = {
    registration,
    logout,
    login,
    findUser,
    doesUserOwnDocument
}