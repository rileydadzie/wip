require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/connectDB')
const mainRoutes = require('./routes/mainRoutes')
const patternRoutes = require('./routes/patternRoutes')
const projectRoutes = require('./routes/projectRoutes')
const app = express()
const PORT = process.env.PORT || 3500

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.use('/', mainRoutes)
app.use('/pattern', patternRoutes)
app.use('/project', projectRoutes)


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})
 