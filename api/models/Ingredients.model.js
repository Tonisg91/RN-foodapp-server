const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Ingredients = mongoose.model('Ingredient', new Schema({
    name: {
        type: String,
        required: true
    },
    desc: String,
    vegetarian: Boolean,
    vegan: Boolean,
    gluten_free: Boolean,
    kcal: Number,
    nutritional_info: String,
    img_url: String,
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
}
))

module.exports = Ingredients
