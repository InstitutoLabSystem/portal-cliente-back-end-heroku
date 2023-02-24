const GroupEmail = require('../models/GroupEmail')

const groupsEmail = {
  async create(req, res) {
    if (!req.body.email) {
      return res.status(400).json({ msg: 'Campos vazios não são permitidos!' })
    }
    try {
      const groupEmail = await GroupEmail.findOne({
        where: { email: req.body.email, id_grupo: req.body.id_grupo },
      })

      if (groupEmail) {
        return res.status(400).json({ msg: 'Email já cadastrado' })
      }
    } catch (err) {
      return res.status(500).json({ msg: 'Error mysql' })
    }

    try {
      const groupEmail = await GroupEmail.create({
        email: req.body.email,
        id_grupo: req.body.id_grupo,
      })
      return res
        .status(201)
        .json({ msg: 'Sucesso, Email cadastrado', groupEmail })
    } catch (error) {
      return res.status(400).json({ msg: 'Error, não foi possível cadastrar' })
    }
  },
  async getAll(req, res) {
    try {
      const groupEmail = await GroupEmail.findAll({
        where: { id_grupo: req.query.id_grupo },
      })
      res.json(groupEmail)
    } catch (error) {
      console.log(error)
      return await res
        .status(400)
        .json({ msg: 'Error, não foi possível buscar o Email' })
    }
  },
  async update(req, res) {
    if (!req.body.id) {
      return res.status(400).json({ msg: 'Error, está faltando o id' })
    }

    try {
      const groupEmail = await GroupEmail.findOne({
        where: { email: req.body.email, id_grupo: req.body.id_grupo },
      })

      if (groupEmail) {
        return res.status(400).json({ msg: 'Email já cadastrado' })
      }
    } catch (err) {
      return res.status(500).json({ msg: 'Error mysql' })
    }

    try {
      await GroupEmail.update(
        { email: req.body.email, id_grupo: req.body.id_grupo },
        { where: { id: req.body.id } },
      )
      const groupEmail = {
        id: req.body.id,
        email: req.body.email,
        id_grupo: req.body.id_grupo,
      }
      return res.json({ msg: 'Email Atualizado', groupEmail })
    } catch (error) {
      return res.status(400).json({ msg: 'Error, campos vazios' })
    }
  },
  async delete(req, res) {
    if (!req.query.id) {
      return res.status(400).json({ msg: 'Error, está faltando o id' })
    }
    try {
      await GroupEmail.destroy({ where: { id: req.query.id } })
      res.json({ msg: 'Sucesso, Email deletado!' })
    } catch (error) {
      res.status(400).json({ msg: 'Error, não foi possível detelar' })
    }
  },
}

module.exports = groupsEmail
