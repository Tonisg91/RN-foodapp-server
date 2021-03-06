const router = require('express').Router()
const isAuthenticated = require('../auth')
const { Meals } = require('../models')

router.get('/', async (req, res) => {
    try {
        const currentMeals = await Meals.find({})
        if (!currentMeals.length) return res.sendStatus(204)

        const responseData = currentMeals.map(({_id, title, img_url}) => {
            return {
                _id,
                title,
                img_url
            }
        })

        res.status(200).json({ data: responseData })
    } catch (error) {
        res.status(500).json({message: 'Error getting meals. '})
    }
})

router.get('/:mealid', async (req, res) => {
    try {
        const { mealid } = req.params
        const meal = await Meals.findById(mealid)

        res.status(200).json({ data: meal })
    } catch (error) {
        res.status(500).json({message: 'Error getting meal.'})
    }
})

router.post('/', isAuthenticated, async (req, res) => {
    try {
        const { _id } = req.user
        await Meals.create({ ...req.body, timestamps: { createdBy: _id }})
        res.sendStatus(201)
    } catch (error) {
        res.status(500).json({message: 'Error creating meal.'})
    }
})

router.put('/:mealid', isAuthenticated, async (req, res) => {
    try {
        const { mealid } = req.params
        await Meals.findByIdAndUpdate(mealid, req.body)
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({message: 'Error updating meal.'})
    }
})

router.delete('/:mealid', isAuthenticated, async (req, res) => {
    try {
        const { mealid } = req.params
        await Meals.findByIdAndDelete(mealid)
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({message: 'Error deleting meal.'})
    }
})

module.exports = router