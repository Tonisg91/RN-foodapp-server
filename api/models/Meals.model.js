const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ingredientSubSchema = new Schema({
    ingredient: {
        type: Schema.Types.ObjectId,
        ref: 'Ingredient'
    },
    qty: {
        type: Number
    }
}, {_id: false})

const Meals = mongoose.model('Meal', new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    desc: String,
    kcal: Number,
    vegetarian: {
        type: Boolean,
        default: false
    },
    vegan: {
        type: Boolean,
        default: false
    },
    gluten_free: {
        type: Boolean,
        default: false
    },
    nutritional_info: String,
    ingredients: [ingredientSubSchema],
    steps: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Step'
        }
    ],
    servings: Number,
    img_url: String,
    video: String
    }, {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        }
    }
))

module.exports = Meals
