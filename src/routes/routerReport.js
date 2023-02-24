const express = require('express')
const Router = express.Router()
const uploadRelatorio = require('./midlleware/uploadRelatorio')
const controllerReport = require('../controllers/controllerReport')

Router.post(
  '/new',
  uploadRelatorio.single('pdfrelatorio'),
  controllerReport.novoRelatorio,
)
Router.get('/get', controllerReport.get)
Router.get('/getAll', controllerReport.getall)
Router.delete('/delete', controllerReport.delete)

Router.put('/updateStatus', controllerReport.putStatus)

module.exports = Router
