const express = require('express')
const Router = express.Router()
const controllerEmails = require('../controllers/controllerEmails')

Router.post('/post', controllerEmails.create)
Router.get('/get', controllerEmails.get)
Router.put('/put', controllerEmails.update)
Router.delete('/delete', controllerEmails.delete)

Router.get('/getEmailsEnviados', controllerEmails.getEmailsEnviados)
Router.put('/putEmailsEnviados', controllerEmails.updateEmailsEnviados)

Router.post('/sendEmail', controllerEmails.sendEmail)

Router.post('/emailsEnviados', controllerEmails.createEmailsEnviados)
Router.get('/emailsEnviados', controllerEmails.getEmailsEnviados)

module.exports = Router
