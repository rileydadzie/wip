const express = require('express')
const patternController = require('../controllers/patternController')
const patternRouter = express.Router()

// patternRouter
//     .route('/')
//     .get(patternController.getAllPatterns)


patternRouter   
    .route('/upload')
    .post(patternController.createPattern)

patternRouter
    .route('/addPart/:patternId')
    .post(patternController.addPart)

patternRouter
    .route('/:id')
    .get(patternController.patternPage)




patternRouter
    .route('/edit/:id')
    .get(patternController.editPage)
    .post(patternController.updatePattern)





patternRouter  
    .route('/delete/:id')
    .post(patternController.deletePattern)

module.exports = patternRouter