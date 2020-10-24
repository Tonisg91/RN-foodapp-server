const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Users = mongoose.model('User', new Schema({
    email: {
        type: String,
        required: [true, 'Email is mandatory'],
        match: [/^\S+@\S+\.\S+$/, "Wrong email structure"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    photo: {
        type: String,
        default: 'https://adncultura.org/sites/default/files/styles/mg_user_picture/public/default_images/default-user.png?itok=-m-meRA9'
    },
    name: String,
    passwordHash: {
        type: String,
        required: [true, 'Password is mandatory']
    },
    meals: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Meal'
        }
    ]
    }, {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
))

module.exports = Users