const express = require('express')
const Router = express.Router()
const controllerUserPermission = require('../controllers/controllerUserPermission')

Router.get('/getUserAuth', controllerUserPermission.getUserAuth)
Router.get('/getUserPermission', controllerUserPermission.getUser)

module.exports = Router
