const express = require('express')
const Router = express.Router()
const multer = require('multer');
const upload = multer();
const controllerReport = require('../controllers/controllerReport')
const controllerUpload = require('../controllers/controllerUpload')

Router.post('/new', controllerReport.novoRelatorio,)
Router.post('/uploadFile', upload.any(), controllerUpload.uploadFile)
Router.get('/get', controllerReport.get)
Router.get('/getAll', controllerReport.getall)
Router.get('/getLogin', controllerReport.getLogin)
Router.put('/delete', controllerReport.delete)
Router.put('/putStatus', controllerReport.updateStatus)

Router.post('/createAcesso', controllerReport.createAcesso)

Router.put('/updateStatus', controllerReport.putStatus)

module.exports = Router
