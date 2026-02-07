const Pattern = require('../models/patternSchema')
const Project = require('../models/projectSchema')


const getAllPatterns = async (req, res) => {
    try {
        const patterns = await Pattern.find()
        const projects = await Project.find()
        res.render('home', {patterns: patterns, projects:projects})
    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    getAllPatterns
}