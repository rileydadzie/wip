const express = require('express')
const patternController = require('../controllers/patternController')
const projectController = require('../controllers/projectController')
const mainController = require('../controllers/mainController')
const router = express.Router()


router
    .route('/')
    .get(mainController.getAllPatterns)



module.exports = router