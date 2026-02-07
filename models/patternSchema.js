const mongoose = require('mongoose')

const patternPartSchema = new mongoose.Schema({
    part: String,
    quantity: Number,
    rows: Number
})
const patternSchema = new mongoose.Schema({
    title: String,
    writer: String,
    source: String,
    numOfColors: Number,
    patternRows: Number,
    parts: [patternPartSchema]
})

module.exports = mongoose.model('Pattern', patternSchema)