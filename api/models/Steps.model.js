const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Steps = mongoose.model('Step', new Schema({
    title: String,
    img_url: String,
    step_number: Number,
    desc: {
        type: String,
        required: true
    },
    meal: {
        type: Schema.Types.ObjectId,
        ref: 'Meal'
    }
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

module.exports = Steps