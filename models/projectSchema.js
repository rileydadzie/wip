const mongoose = require('mongoose')
const colorSchema = new mongoose.Schema({
    yarnId: mongoose.Schema.Types.ObjectId,
    yarnCollection: String,
    colorName: String,
    primaryColorCode: String,
    startWeight: Number,
    endWeight: Number,
    weightUsed: Number
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
    pattern: mongoose.Schema.Types.ObjectId,
    projectRows: Number,
    completedRows: Number,
    colors: [colorSchema],
    parts: [projectPartSchema],
    complete: Boolean,
    timesMade: Number,
    stopwatch: {
        startTime: Date,
        accumulatedTime: Number,
        isRunning: Boolean
    }
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