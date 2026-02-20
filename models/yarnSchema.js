const mongoose = require('mongoose')


const yarnSchema = new mongoose.Schema({
    brand: String,
    yarnCollection: String,
    size: Number,
    colorName: String,
    colorFamily: String,
    primaryColorCode: String,
    colorType: String,
    varColorCodes: [String],
    weight: Number,
    inUse: Boolean
})


module.exports = mongoose.model('Yarn', yarnSchema)