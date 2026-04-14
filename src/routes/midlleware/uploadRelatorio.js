const express = require('express');
const multer = require('multer');
const Router = express.Router();
const controllerUpload = require('../controllers/controllerUpload');

// Multer em memória (sem salvar em disco)
const upload = multer({ storage: multer.memoryStorage() });

Router.post('/uploadFile', upload.any(), controllerUpload.uploadFile);
Router.get('/refreshUrl/:id', controllerUpload.refreshUrl);

module.exports = Router;
