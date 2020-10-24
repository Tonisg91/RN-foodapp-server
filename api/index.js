const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
    }
)


const { mealsRoutes, ingredientsRoutes, userRoutes } = require('./routes')

app.use('/api/auth', userRoutes)
app.use('/api/meals', mealsRoutes)
app.use('/api/ingredients', ingredientsRoutes)

module.exports = app
