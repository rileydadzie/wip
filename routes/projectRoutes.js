const express = require('express')
const projectController = require('../controllers/projectController')
const projectRouter = express.Router()

projectRouter
    .route('/complete/:projectId')
    .post(projectController.complete)
    
projectRouter
    .route('/add/:id')
    .get(projectController.createProject)

projectRouter
    .route('/create/:id')
    .post(projectController.createProject)

projectRouter
    .route('/addYarn/:projectId/:yarnId')
    .post(projectController.addYarnFromStash)

projectRouter
    .route('/deleteColor/:projectId/:yarnId')
    .post(projectController.deleteColor)

projectRouter
    .route('/edit/:projectId')
    .get(projectController.editProject)
    .post(projectController.updateProject) 

projectRouter
    .route('/delete/:id')
    .post(projectController.deleteProject)

projectRouter
    .route('/makeAgain/:projectId')
    .post(projectController.makeAgain)

projectRouter
    .route('/part/rowCount/:projectId/:partIndex')
    .post(projectController.updateRow)

projectRouter
    .route('/finishPart/:projectId/:partIndex')
    .post(projectController.finishPart, projectController.markCompletePart, projectController.updateProgress)


projectRouter  
    .route('/part/:projectId/:partIndex')
    .post(projectController.setActivePart)

projectRouter
    .route('/nextpart/:projectId/:partIndex')
    .post(projectController.markCompletePart)



projectRouter
    .route('/:id')
    .get(projectController.projectPage)




module.exports = projectRouter