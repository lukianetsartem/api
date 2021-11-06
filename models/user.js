const {Schema, model} = require('mongoose')

const emailMatch = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

const userSchema = new Schema({
    login: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: emailMatch },
    password: { type: String, required: true },
    documents: { type: Array, required: true }
})

module.exports = model('User', userSchema)