const Clientes = require('../models/Clientes')
// const PortalEmails = require("../models/PortalEmails");

const clientes = {
  async get(req, res) {
    if (!req.query.codCli) {
      return res
        .status(400)
        .json({ msg: 'Error, Não foi recebido o Codigo Cliente' })
    }
    try {
      const cliente = await Clientes.findOne({
        attributes: ['RAZCLI'],
        where: { CODCLI: req.query.codCli },
      })
      res.json(cliente)
    } catch (error) {
      console.log(error)
      return await res
        .status(400)
        .json({ msg: 'Error, não foi possível buscar o cliente' })
    }
  },
}

module.exports = clientes
