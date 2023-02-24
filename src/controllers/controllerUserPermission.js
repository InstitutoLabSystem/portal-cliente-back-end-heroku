const UsersPermission = require('../models/UsersPermission')

const usersPermission = {
  async getUserAuth(req, res) {
    if (!req.query.nomeUsuario) {
      return res
        .status(400)
        .json({ msg: 'Error, não foi possível buscar o usuario' })
    }
    try {
      const user = await UsersPermission.findAll({
        where: { nomeUsuario: req.query.nomeUsuario },
      })
      if (user) {
        return res.json(user)
      } else {
        return res.status(400).json({ msg: 'Error, Usuario não autenticado' })
      }
    } catch (error) {
      return res.json('Erro ao buscar o usuario')
    }
  },
  async getUser(req, res) {
    try {
      const user = await UsersPermission.findAll({
        order: [
          ['cargo', 'ASC'],
          ['nomeUsuario', 'ASC'],
        ],
      })
      return res.json(user)
    } catch (error) {
      return res.json('Erro ao buscar o usuario')
    }
  },
}

module.exports = usersPermission
