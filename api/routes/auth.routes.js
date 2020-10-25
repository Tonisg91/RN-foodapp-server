const router = require('express').Router()
const { Users } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signToken = (_id) => {
    return jwt.sign(
        {_id},
        'secret-key', 
        {expiresIn: 60 * 60 * 24 * 365}
    )
}

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).send('Email and password are mandatory.')

        const existentUser = await Users.findOne({email})
        if (existentUser) return res.status(200).send('User already exists.')

        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(password, salt)
        await Users.create({email, passwordHash})

        res.status(200).send('User created succesfully')
    } catch (error) {
        res.status(500).send('Error creating account.')
    }
})

router.post('/login',async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).send('Email and password are mandatory.')

        const user = await Users.findOne({ email })
        if (!user) return res.status(204).send("User doesn't exist. Please, create an account.")

        const pwdMatch = bcrypt.compareSync(password, user.passwordHash)
        if (!pwdMatch) return res.status(401).send("Password doesn't match.")

        const token = signToken(user._id)
        res.status(200).send(token)
    } catch (error) {
        res.status(500).send('Login error.')
    }
})

module.exports = router