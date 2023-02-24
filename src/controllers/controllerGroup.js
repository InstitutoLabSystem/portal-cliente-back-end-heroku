const Group = require('../models/Group')
const GroupEmail = require('../models/GroupEmail')

const groups = {
  async create(req, res) {
    if (!req.body.descricao) {
      return res.status(400).json({ msg: 'Campos vazios não são permitidos!' })
    }
    try {
      const group = await Group.findOne({
        where: { descricao: req.body.descricao },
      })

      if (group) {
        return res.status(400).json({ msg: 'Grupo já cadastrado' })
      }
    } catch (err) {
      return res.status(500).json({ msg: 'Error mysql' })
    }

    try {
      const group = await Group.create({
        descricao: req.body.descricao,
      })
      return res.json({ msg: 'Sucesso, Grupo cadastrado', group })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ msg: 'Error, não foi possível cadastrar' })
    }
  },
  async getAll(req, res) {
    try {
      const group = await Group.findAll()
      res.json(group)
    } catch (error) {
      console.log(error)
      return await res
        .status(400)
        .json({ msg: 'Error, não foi possível buscar o Grupo' })
    }
  },
  async update(req, res) {
    if (!req.body.id) {
      return res.status(400).json({ msg: 'Error, está faltando o id' })
    }

    try {
      const group = await Group.findOne({
        where: { descricao: req.body.descricao },
      })

      if (group) {
        return res.status(400).json({ msg: 'Grupo já cadastrado' })
      }
    } catch (err) {
      return res.status(500).json({ msg: 'Error mysql' })
    }

    try {
      await Group.update(
        { descricao: req.body.descricao },
        { where: { id: req.body.id } },
      )
      const group = {
        id: req.body.id,
        descricao: req.body.descricao,
      }
      console.log(group)
      return res.json({ msg: 'Grupo Atualizado', group })
    } catch (error) {
      return res.status(400).json({ msg: 'Error, campos vazios' })
    }
  },
  async delete(req, res) {
    if (!req.query.id) {
      return res.status(400).json({ msg: 'Error, está faltando o id' })
    }
    try {
      const groupEmail = await GroupEmail.findAll({
        where: { id_grupo: req.query.id },
      })
      if (groupEmail.length > 0) {
        return res
          .status(400)
          .json({ msg: 'Erro, Delete todos os emails do Grupo' })
      }
      await Group.destroy({ where: { id: req.query.id } })
      res.json({ msg: 'Sucesso, Grupo deletado!' })
    } catch (error) {
      res.status(400).json({ msg: 'Error, não foi possível detelar' })
    }
  },
}

module.exports = groups
