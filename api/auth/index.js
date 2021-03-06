const jwt = require('jsonwebtoken')
const Users = require('../models/Users.models')

module.exports = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.sendStatus(403)
    }
    jwt.verify(token, 'secret-key', (err, decoded) => {
        const { _id } = decoded
        Users.findOne({ _id }).exec()
            .then(user => {
                req.user = user
                next()
            })
    })
}