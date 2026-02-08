const mongoose = require('mongoose')
const colorSchema = new mongoose.Schema({
    brand: String,
    collection: String,
    colorName: String,
    colorCode: String,
    startWeight: Number,
    endWeight: Number,
    weight: Number
})

const projectPartSchema = new mongoose.Schema({
    part: String,
    complete: Boolean,
    active: Boolean,
    quantity: Number,
    quantityCompleted: Number,
    currentRow: Number,
    rows: Number
})

const projectSchema = new mongoose.Schema({
    title: String,
    progress: Number,
    pattern: String,
    projectRows: Number,
    completedRows: Number,
    colors: [colorSchema],
    parts: [projectPartSchema]
})

module.exports = mongoose.model('Project', projectSchema)


// id
// title
// patternId
// color [brand, collection, name, hexcode]
// rows
// completedrows
// parts [NAME, quantityneeded, quantitycompleted, rows, currentrow, totalRows, active, complete]
// finished
// img