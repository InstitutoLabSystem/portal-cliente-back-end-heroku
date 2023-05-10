const express = require('express')
const Router = express.Router()
const controllerObservations =  require('../controllers/controllerObservations')

Router.post('/', controllerObservations.create)
Router.get('/', controllerObservations.get)
Router.put('/', controllerObservations.update)
Router.delete('/', controllerObservations.delete)



module.exports = Router