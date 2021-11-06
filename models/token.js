const {Schema, model} = require('mongoose')

const string = { type: String, required: true }

const tokenSchema = new Schema({
    userId: string,
    refreshToken: string,
})

module.exports = model('Token', tokenSchema)