const express = require('express')
const Router = express.Router()
const controllerReport = require('../controllers/controllerReport')

Router.post('/uploadFile', controllerReport.uploadMiddleware.single('arquivo'), controllerReport.uploadFile)
Router.post('/new', controllerReport.novoRelatorio)
Router.get('/get', controllerReport.get)
Router.get('/getAll', controllerReport.getall)
Router.get('/getLogin', controllerReport.getLogin)
Router.delete('/delete', controllerReport.delete)
Router.put('/putStatus', controllerReport.updateStatus)

Router.post('/createAcesso', controllerReport.createAcesso)

Router.put('/updateStatus', controllerReport.putStatus)

module.exports = Router
