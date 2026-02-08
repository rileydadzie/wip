const Project = require('../models/projectSchema')
const Pattern = require('../models/patternSchema')


const add = async (req,res) => {
    try {
        const pattern = await Pattern.findById(req.params.id)
        res.render('addProject', {pattern: pattern})
    } catch(err) {
        console.log(err)
    }
}

const createProject = async (req,res) => {
    try{
        const pattern = await Pattern.findById(req.params.id)
        const patternParts = pattern.parts
        let projectParts = []
        patternParts.forEach((part) => {
            projectParts.push(
                {
                complete: false,
                active: false,
                part: part.part,
                quantity: part.quantity,
                quantityCompleted: 0,
                currentRow: 0,
                rows: part.rows,
                totalRows: part.totalRows
            })
        })
        const project = new Project ({
            title: req.body.title,
            progress: 0,
            pattern: req.params.id,
            projectRows: pattern.patternRows,
            completedRows:0,
            parts: projectParts,
            colors: [{
                brand: req.body.brand,
                collection: req.body.collection,
                colorName: req.body.colorName,
                colorCode: req.body.colorCode
            }]
        })
        await project.save()
        res.redirect('/project/edit/' + project._id)
    } catch(err) {
        console.log(err)
    }
}

const editProject = async (req,res) => {
    try{
        const project = await Project.findById(req.params.id)
        res.render('editProject', {project:project})
    } catch(err) {
        console.log(err)
    }
}

const addYarn = async (req,res) => {
    try{
        await Project.findByIdAndUpdate(
            {_id: req.params.id},
            {$push: {colors: {
                brand: req.body.brand,
                collection: req.body.collection,
                colorName: req.body.colorName,
                colorCode: req.body.colorCode
            }}}
        )
        res.redirect('/project/edit/' + req.params.id)
    } catch(err) {
        console.log(err)
    }
}

const updateProject = async (req,res) => {
    try{
        await Project.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/')
    }catch(err) {
        console.log(err)
    }
}

// const resetActivePart = async (req,res) => {
//     try{

//     } catch (err) {
//         console.log(err)
//     }
// }

const setActivePart = async (req, res) => {
    try{
        const partIndex = req.params.partIndex

        await Project.updateOne(
            {_id: req.params.projectId},
            {
                $set: {
                    "parts.$[].active" : false
                }
            }
        )
        await Project.updateOne(
            {_id: req.params.projectId},
            {
                $set: {
                    [`parts.${partIndex}.active`] : true
                }
            }
        )
        res.redirect('/project/' + req.params.projectId)
    } catch(err) {
        console.log(err)
    }
}



const updateRow = async (req,res) => {
    const currentRow = req.body.counterNum
    const partIndex = req.params.partIndex
    try{
        await Project.updateOne(
            {_id: req.params.projectId},
            {
                $set: {
                    [`parts.${partIndex}.currentRow`] : Number(`${currentRow}`)
                }
            }
        )
    res.redirect('/project/' + req.params.projectId)
        
    }catch(err) {
        console.log(err)
    }
}

 const finishPart = async (req,res, next) => {
    try{
        const partIndex = req.params.partIndex
        const project = await Project.findById(req.params.projectId)
        const rows = Number((project?.parts?.[partIndex]?.rows))
        await Project.updateOne(
            {_id: req.params.projectId},
            {
                $inc: {
                    [`parts.${partIndex}.quantityCompleted`] : 1,
                    completedRows: rows
                }

            }
            
        )
        return next()
    }catch(err){
        console.log(err)
    }
 }
 const markCompletePart = async (req,res, next) => {
    try{
        const project = await Project.findById(req.params.projectId)
        const partIndex = Number(req.params.partIndex)
        const quantity = Number(project.parts[partIndex].quantity)
        const quantityCompleted = Number(project.parts[partIndex].quantityCompleted)
        
  
        if(quantityCompleted === quantity) {
            const nextIndex = partIndex + 1
            await Project.updateOne(
                {_id: req.params.projectId},
                {
                    $set: {
                        [`parts.${partIndex}.active`]: false,
                        [`parts.${partIndex}.complete`]: true,
                        [`parts.${nextIndex}.active`]: true
                    }
                }
            )
        }
        return next()
    }catch (err){
        console.log(err)
    }
}

const updateProgress = async (req,res) => {
    try{
        const projectId = req.params.projectId
        const project = await Project.findById(projectId)
        const updatedProg = Math.ceil(Number(((project.completedRows) / (project.projectRows)) * 100))
        if(project.projectRows > 0){
            await Project.updateOne(
            {_id: projectId},
            {
                $set: {progress : updatedProg}
            }
        )
        }
        
        res.redirect('/project/' + projectId)
    }catch (err) {
        console.log(err)
    }
}

const projectPage = async (req,res) => {
    try{
        const project = await Project.findById(req.params.id)
        const pattern = await Pattern.findById(project.pattern)
        const activePart = project.parts.find(part => part.active === true) || null
        const activePartIndex = project.parts.findIndex(part => part.active === true)
        res.render('project', {project:project, pattern:pattern, activePart:activePart, activePartIndex: activePartIndex})
    }catch (err) {
        console.log(err)
    }
}

const deleteProject = async (req,res) => {
    try{
        await Project.findByIdAndDelete(req.params.id)
        res.redirect('/')
    }catch(err) {
        console.log(err)
    }
}




module.exports = {
    add,
    createProject,
    editProject,
    addYarn,
    updateProject,
    projectPage,
    deleteProject,
    setActivePart,
    updateRow,
    finishPart,
    updateProgress,
    markCompletePart   
    // projectPage
}