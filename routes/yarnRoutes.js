const express = require('express')
const yarnController = require('../controllers/yarnController')
const projectController = require('../controllers/projectController')
const yarnRouter = express.Router()

yarnRouter
    .route('/addToProject/:projectId')
    .post(yarnController.addYarnToProject)

yarnRouter
    .route('/varigated/:yarnId')
    .post(yarnController.addVarColor)

yarnRouter  
    .route('/:yarnId')
    .get(yarnController.infoPage)

yarnRouter
    .route('/add')
    .post(yarnController.addYarn)


yarnRouter
    .route('/')
    .get(yarnController.yarnPage)




module.exports = yarnRouter