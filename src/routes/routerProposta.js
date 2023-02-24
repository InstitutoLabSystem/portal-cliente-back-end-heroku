const express = require('express')
const Router = express.Router()
const controllerSearch = require('../controllers/controllersSearch')

Router.get('/all', controllerSearch.buscarOrcamentos)
// Router.get("filtro", controllerSearch.getFiltro);

module.exports = Router
