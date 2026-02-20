
const Project = require('../models/projectSchema')
const Yarn = require('../models/yarnSchema')


const yarnPage = async (req, res) => {
    try {
        const yarns = await Yarn.find()
        res.render('yarn', {yarns:yarns})
    } catch(err) {
        console.log(err)
    }
}

const infoPage = async (req, res) => {
    try {
        const yarn = await Yarn.findById(req.params.yarnId)
        res.render('yarnInfo', {yarn:yarn})
    }catch(err) {
        console.log(err)
    }
}

const addYarn = async (req,res) => {
    try {
        const yarn = new Yarn ({
            brand: req.body.brand,
            yarnCollection: req.body.yarnCollection,
            size: req.body.size,
            colorName: req.body.colorName,
            colorFamily: req.body.colorFamily,
            colorType: req.body.colorType,
            primaryColorCode: req.body.primaryColorCode,
            weight: req.body.weight,
            inUse: false 
        })

        yarn.save()
        res.redirect('/yarn')
    }catch (err) {
        console.log(err)
    }
}

const addVarColor = async (req,res) => {
    try{
        const colorCode = String(req.body.varColorCode)
        await Yarn.updateOne(
            {_id : req.params.yarnId},
            { $push : { varColorCodes : colorCode}}
        )
        res.redirect('/yarn/' + req.params.yarnId)
    }catch(err) {
        console.log(err)
    }
}

const addYarnToProject = async (req,res, next) => {
    try {
        const yarn = new Yarn ({
            brand: req.body.brand,
            yarnCollection: req.body.yarnCollection,
            size: req.body.size,
            colorName: req.body.colorName,
            colorFamily: req.body.colorFamily,
            colorType: req.body.colorType,
            primaryColorCode: req.body.primaryColorCode,
            weight: req.body.weight,
            inUse: true 
        })

        yarn.save()

        await Project.findByIdAndUpdate(
                    {_id: req.params.projectId},
                    {$push: {colors: {
                        yarnId: yarn._id,
                        yarnCollection: yarn.yarnCollection,
                        colorName: yarn.colorName,
                        primaryColorCode: yarn.primaryColorCode
                    }}}
                )
                res.redirect('/project/' + req.params.projectId)
        return next()
    }catch (err) {
        console.log(err)
    }
}




module.exports = {
    yarnPage,
    infoPage,
    addVarColor,
    addYarn,
    addYarnToProject
}