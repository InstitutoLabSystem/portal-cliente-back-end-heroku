require('dotenv').config()
const testeConnection = require('./src/database/index')

const port = process.env.PORT || 8000

const os = require('os');

const networkInfo = os.networkInterfaces();

const express = require('express')
const cors = require('cors')
const config = require('./src/config/config')
const routerReport = require('./src/routes/routerReport')
const routerProposta = require('./src/routes/routerProposta')
const routerClientes = require('./src/routes/routerClientes')
const routerEmails = require('./src/routes/routerEmails')
const routerDownloads = require('./src/routes/routerDownloads')
const routerSetores = require('./src/routes/routerSetores')
const routerUsers = require('./src/routes/routerUsers')
const routerGroup = require('./src/routes/routerGroup')
const routerEmailCopia = require('./src/routes/routerEmailCopia')
const routerObservations = require('./src/routes/routerObservations')
const routerLog = require('./src/routes/routerLog')
const app = express()

app.use('/report', cors(config.cors), express.json(), routerReport)
app.use('/orc', cors(config.cors), express.json(), routerProposta)
app.use('/clientes', cors(config.cors), express.json(), routerClientes)
app.use('/emails', cors(config.cors), express.json(), routerEmails)
app.use('/setores', cors(config.cors), express.json(), routerSetores)
app.use('/downloads', cors(config.cors), express.json(), routerDownloads)
app.use('/users', cors(config.cors), express.json(), routerUsers)
app.use('/group', cors(config.cors), express.json(), routerGroup)
app.use('/emailCopia', cors(config.cors), express.json(), routerEmailCopia)
app.use('/observation', cors(config.cors), express.json(), routerObservations)
app.use('/log', cors(config.cors), express.json(), routerLog)

app.get('/', function (req, res) {
  testeConnection.connectionportalrelatorio
    .authenticate()
    .then(() => {
      console.log('Conectado com sucesso')
      res.send('Conectado com sucesso')
    })
    .catch((err) => {
      console.log('Erro ao conectar: ' + err)
      res.send('Erro ao conectar: ' + err)
    })
})

app.listen(port, () => {
  // console.log('Objeto: ', networkInfo)
  // console.log('IP: ', networkInfo.log[0].address)
  console.log(`Example app listening at http://localhost:${port}`)
})
