// Common error thrower
const throwError = (error) => {
    throw new Error(error)
}

const authError = () => {
    throw new Error('Authorization error')
}

module.exports = {
    throwError,
    authError
}