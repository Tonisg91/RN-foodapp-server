const router = require('express').Router()
const { Users } = require('../models')
const bcrypt = require('bcrypt')

router.post('/signup', (req, res) => {
    try {
        const { email, password } = req.body
        const salt = bcrypt.genSaltSync()
        const passwordHash = bcrypt.hashSync(password, salt)
    } catch (error) {
        
    }
})

router.post('/login', (req, res) => {
    res.send('Login')
})

module.exports = router