const Pattern = require('../models/patternSchema')
const Project = require('../models/projectSchema')
// const multer = require('multer')

// multer config for image upload
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './public/images');
//     },
//     filename: function(req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// });

// const upload = multer({storage: storage})

// const getAllPatterns = async (req, res) => {
//     try {
//         const patterns = await Pattern.find()
//         res.render('home', {patterns: patterns})
//     } catch(err) {
//         console.log(err)
//     }
// }

const uploadPage = (req,res) => {
    res.render("addPattern")
}


const createPattern = async (req,res) => {
    try{
        const pattern = new Pattern ({
            title: req.body.title,
            writer: req.body.writer,
            source: req.body.source,
            numOfColors: req.body.numOfColors,
            patternRows: 0
            
    })
    await pattern.save()
    res.redirect('/pattern/edit/' + pattern._id)

    } catch(err) {
        console.log(err)
    }
}

const patternPage = async (req,res) => {
    
    try{
        const pattern = await Pattern.findById(req.params.id)
        const patternProjects = await Project.find({pattern: req.params.id}) || null
        res.render('pattern', {pattern:pattern, patternProjects: patternProjects})
    } catch(err) {
        console.log(err)
    }
}

const editPage = async (req,res) => {
    try{
        const pattern = await Pattern.findById(req.params.id)
        res.render('editPattern', {pattern:pattern})
    }catch(err) {
        console.log(err)
    }
}

const addPart = async (req,res) => {
    try{
        const quantity = req.body.quantity
        const rows = req.body.rows
        const totalRows = quantity * rows
              await Pattern.findByIdAndUpdate(
            {_id: req.params.patternId},
            {
                $push: {parts: { 
                part:req.body.part, 
                quantity:quantity, 
                rows:rows,
                totalRows: totalRows
            }},
            $inc: { patternRows : totalRows}
        }
            
            )
        res.redirect('/pattern/edit/' + req.params.patternId)
    }catch(err) {
        console.log(err)
    }
}

const updatePattern = async (req,res) => {
    try{
        await Pattern.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/')
    }catch(err) {
        console.log(err)
    }
}

const deletePattern = async (req,res) => {
    try{
        await Pattern.findByIdAndDelete(req.params.id)
        res.redirect('/')
    }catch(err) {
        console.log(err)
    }
}


module.exports = {
    // getAllPatterns,
    // upload,
    createPattern,
    uploadPage,
    patternPage,
    editPage,
    updatePattern,
    deletePattern,
    addPart
}