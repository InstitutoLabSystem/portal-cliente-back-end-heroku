const { Sequelize, Op } = require('sequelize')
const Proposta = require('../models/Proposta')

const search = {
  async bucarProposta(orcamento) {
    const result = await Proposta.findOne({
      where: Sequelize.where(
        Sequelize.fn(
          'CONCAT',
          Sequelize.col('codigo'),
          Sequelize.col('mes'),
          Sequelize.col('ano'),
        ),
        orcamento,
      ),
    })
    return result
  },
  async buscarOrcamentos(req, res) {
    if (!req.query.orcamento) {
      return res.status(400).json({ msg: 'Sem orcamento' })
    }
    try {
      const orcamentos = await Proposta.findAll({
        where: Sequelize.where(
          Sequelize.fn(
            'CONCAT',
            Sequelize.col('codigo'),
            Sequelize.col('mes'),
            Sequelize.col('ano'),
          ),
          {
            [Op.eq]: req.query.orcamento,
          },
        ),
        attributes: [
          'token',
          'senha',
          'codigo',
          'numprocesso',
          'mes',
          'ano',
          'Dataofe',
          'CodCli',
          'emailSol',
          'emailCli',
          'Cliente',
          'Solicitante',
        ],
      })
      res.json(orcamentos)
    } catch (err) {
      res.json({ msg: 'Erro, Não foi possível fazer a busca!' })
    }
  },
}
module.exports = search
