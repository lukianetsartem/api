const errorMiddleware = require('./errorMiddleware')
const tokenService = require("../service/tokenService");

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) errorMiddleware.authError()

    const accessToken = authHeader.split(' ')[1]

    const userData = tokenService.validateToken(accessToken, process.env.JWT_ACCESS_SECRET)
    if (!userData) errorMiddleware.authError()

    req.userId = userData.id
    next()
}