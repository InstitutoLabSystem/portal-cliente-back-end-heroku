const express = require('express')
const Router = express.Router()
const controllerClientes = require('../controllers/controllerClientes')

Router.get('/get', controllerClientes.get)

module.exports = Router
