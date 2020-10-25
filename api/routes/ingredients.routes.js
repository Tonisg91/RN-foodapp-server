const router = require('express').Router()
const isAuthenticated = require('../auth')
const { Ingredients } = require('../models')

router.get('/', async (req, res) => {
    try {
        const currentIngredients = await Ingredients.find({})
        if (!currentIngredients.length) return res.sendStatus(204)

        const responseData = currentIngredients.map(({ _id, title }) => {
            return {
                _id,
                title,
            }
        })

        res.status(200).json({ data: responseData })
    } catch (error) {
        res.status(500).json({ message: 'Error getting ingredients. ' })
    }
})

router.post('/', isAuthenticated, async (req, res) => {
    try {
        await Ingredients.create(req.body)
        res.sendStatus(201)
    } catch (error) {
        res.status(500).json({ message: 'Error creating ingredients.' })
    }
})

router.put('/:mealid', isAuthenticated, async (req, res) => {
    try {
        const { mealid } = req.params
        await Ingredients.findByIdAndUpdate(mealid, req.body)
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({ message: 'Error updating ingredient.' })
    }
})

router.delete('/:mealid', isAuthenticated, async (req, res) => {
    try {
        const { mealid } = req.params
        await Ingredients.findByIdAndDelete(mealid)
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({ message: 'Error deleting ingredient.' })
    }
})

module.exports = router