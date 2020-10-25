const router = require('express').Router()
const { Users } = require('../models')
const bcrypt = require('bcrypt')
const { regexEmail } = require('../resources/regex')


router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.json({message: 'Email and password are mandatory.'})
        if (!regexEmail(email)) return res.json({ message: 'Wrong email structure.' })

        const existentUser = await Users.findOne({email})
        if (existentUser) return res.json({ message: 'User already exists.' })

        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(password, salt)
        await Users.create({email, passwordHash})

        res.status(200).json({message: 'User created succesfully'})
    } catch (error) {
        res.status(500).json({ message: 'Error creating account.' })
    }
})

router.post('/login',async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.json({message: 'Email and password are mandatory.'})
        if (!regexEmail(email)) return res.json({message: 'Wrong email structure.'})

        const user = await Users.findOne({ email })
        if (!user) return res.status(400).json({message: "User doesn't exist. Please, create an account."})

        const pwdMatch = bcrypt.compareSync(password, user.passwordHash)
        if (!pwdMatch) return res.status(401).json({message: "Password doesn't match."})

        res.status(200).json(user._id)
    } catch (error) {
        res.status(500).json({ message: 'Login error.' })
    }
})

module.exports = router