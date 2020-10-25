const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Ingredients = mongoose.model('Ingredient', new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    desc: String,
    vegetarian: {
        type: Boolean,
        default: false
    },
    vegan: {
        type: Boolean,
        default: true
    },
    gluten_free: {
        type: Boolean,
        default: true
    },
    kcal: Number,
    nutritional_info: String,
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
}
))

module.exports = Ingredients
