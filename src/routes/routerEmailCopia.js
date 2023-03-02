const express = require('express')
const Router = express.Router()
const controllerEmailCopia = require('../controllers/controllerEmailCopia')

Router.post('/post', controllerEmailCopia.create)
Router.get('/get', controllerEmailCopia.get)
Router.put('/put', controllerEmailCopia.update)
Router.delete('/delete', controllerEmailCopia.delete)

module.exports = Router
