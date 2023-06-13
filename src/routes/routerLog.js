const express = require('express');
const Router = express.Router();
const controllerLog = require('../controllers/controllerLog')

Router.post('/', controllerLog.create);
Router.post('/', controllerLog.createDelete);
Router.get('/', controllerLog.get);
Router.get('/one', controllerLog.getOne);



module.exports = Router