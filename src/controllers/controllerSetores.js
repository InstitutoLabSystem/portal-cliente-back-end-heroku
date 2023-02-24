const Setores = require('../models/Setores')

module.exports = {
  getAll(req, res) {
    Setores.findAll({ attributes: ['setor'], group: 'setor' })
      .then((data) => {
        return res.json(data)
      })
      .catch((error) => {
        return res.json(error)
      })
  },
}
