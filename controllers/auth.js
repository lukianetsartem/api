const userService = require('../service/userService')
const tokenService = require('../service/tokenService')
const User = require('../models/user')

// Data sending helper
const sendData = (res, userData) => {
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}) // 30d lifetime
    res.cookie('accessToken', userData.accessToken, {maxAge: 0.5 * 60 * 60 * 1000, httpOnly: true}) // 30min lifetime
    return res.json(userData)
}

/* Controllers */

// User create controller
const signUp = (req, res) => {
    const {login, email, password} = req.body

    userService.registration(login, email, password)
        .then(userData => sendData(res, userData))
        .catch(e => console.log(e))
}

// Session create controller
const signIn = (req, res) => {
    const {email, password} = req.body

    userService.login(email, password)
        .then(userData => sendData(res, userData))
        .catch(e => console.log(e))
}

// Session terminate controller
const logout = (req, res) => {
    const {refreshToken} = req.cookies

    userService.logout(refreshToken)
        .then(() => {
            res.clearCookie('refreshToken')
            return res.status(200).json({message: "Successfully logout"})
        })
        .catch(e => console.log(e))
}

// Token refresh controller
const refresh = async (req, res) => {
    const unauthorizedError = () => {
        throw new Error('Invalid credentials.')
    }

    const {refreshToken} = req.cookies
    if (!refreshToken) unauthorizedError()

    const tokenData = tokenService.validateToken(refreshToken, process.env.JWT_REFRESH_SECRET)
    const isTokenExist = tokenService.findToken(refreshToken)
    if (!tokenData || !isTokenExist) unauthorizedError()

    const user = await User.findById(tokenData.id)
    const userData = {id: user._id}

    tokenService.getTokens(userData)
        .then(tokens => sendData(res, {...tokens, userData}))
        .catch(e => console.log(e))
}

module.exports = {
    signUp,
    signIn,
    logout,
    refresh
}