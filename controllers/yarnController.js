
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
const addYarn = async (req,res) => {
    try {
        const yarn = new Yarn ({
            brand: req.body.brand,
            yarnCollection: req.body.yarnCollection,
            size: req.body.size,
            colorName: req.body.colorName,
            colorFamily: req.body.colorFamily,
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

const addYarnToProject = async (req,res, next) => {
    try {
        const yarn = new Yarn ({
            brand: req.body.brand,
            yarnCollection: req.body.yarnCollection,
            size: req.body.size,
            colorName: req.body.colorName,
            colorFamily: req.body.colorFamily,
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

// const addYarn = async (req,res) => {
//     try{
//         const yarn = await Yarn.find({brand: req.brand, yarnCollection: req.yarnCollection}) || null
//          if(!yarn){
//             const addedYarn = new Yarn ({
//                 brand: req.body.brand,
//                 yarnCollection: req.body.yarnCollection,
//                 size: req.body.size
//             })
//             await addedYarn.save()
//         }
//         const updatedYarn = await Yarn.findOneAndUpdate({brand: req.brand, yarnCollection: req.yarnCollection},
//             {$push : { colors : {
                // colorName: req.body.colorName,
                // colorCode: req.body.colorCode,
                // weight: req.body.weight
//             },
//             }},
//             {returnDocument: 'after'}
//         )
//         console.log(updatedYarn)
//         // const updatedId = updatedYarn._id
//         // await Project.findByIdAndUpdate(
//         //     {_id: req.params.projectId},
//         //     {$push: {colors: {
//         //         yarnId: updatedId,
//         //         colorName: req.body.colorName,
//         //         colorCode: req.body.colorCode
//         //     }}}
//         // )
//         res.redirect('/project/' + req.params.projectId)
//     } catch(err) {
//         console.log(err)
//     }
// }


module.exports = {
    yarnPage,
    addYarn,
    addYarnToProject
}