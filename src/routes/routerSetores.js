const express = require('express')
const Router = express.Router()
const controllesSetores = require('../controllers/controllerSetores')

Router.get('/getAll', controllesSetores.getAll)

module.exports = Router
