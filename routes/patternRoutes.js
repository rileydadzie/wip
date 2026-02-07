const express = require('express')
const patternController = require('../controllers/patternController')
const patternRouter = express.Router()

// patternRouter
//     .route('/')
//     .get(patternController.getAllPatterns)


patternRouter   
    .route('/upload')
    .get(patternController.uploadPage)
    .post(patternController.createPattern)

patternRouter
    .route('/:id')
    .get(patternController.patternPage)


patternRouter
    .route('/edit/:id')
    .get(patternController.editPage)
    .post(patternController.updatePattern)

patternRouter
    .route('/edit/addPart/:id')
    .post(patternController.addPart)

patternRouter  
    .route('/delete/:id')
    .post(patternController.deletePattern)

module.exports = patternRouter