const Pattern = require('../models/patternSchema')
const Project = require('../models/projectSchema')


const getAllPatterns = async (req, res) => {
    try {
        const patterns = await Pattern.find()
        const openProjects = await Project.find({complete: false})
        res.render('home', {patterns: patterns, openProjects:openProjects})
    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    getAllPatterns
}