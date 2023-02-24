const express = require('express')
const Router = express.Router()
const controllerDownload = require('../controllers/controllerDownload')

Router.get('/get', controllerDownload.get)
Router.post('/createDownload', controllerDownload.post)

module.exports = Router
