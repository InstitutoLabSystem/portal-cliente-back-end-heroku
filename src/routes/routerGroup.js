const express = require('express')
const Router = express.Router()
const controllerGroup = require('../controllers/controllerGroup')
const controllerGroupEmail = require('../controllers/controllerGroupEmail')

Router.post('/postGroup', controllerGroup.create)
Router.get('/getAllGroup', controllerGroup.getAll)
Router.put('/putGroup', controllerGroup.update)
Router.delete('/deleteGroup', controllerGroup.delete)

Router.post('/postGroupEmail', controllerGroupEmail.create)
Router.get('/getAllGroupEmail', controllerGroupEmail.getAll)
Router.put('/putGroupEmail', controllerGroupEmail.update)
Router.delete('/deleteGroupEmail', controllerGroupEmail.delete)

module.exports = Router
