const EmailsCopia = require('../models/EmailsCopia');
const controllerEmailCopia = require('./controllerSendEmail');

const emailsCopia = {
  async create(req, res) {
    if (!req.body.email) {
      return res.status(400).json({ msg: 'Campos vazios não são permitidos!' });
    }
    try {
      const email = await EmailsCopia.findOne({
        where: { email: req.body.email },
      });

      if (email) {
        return res.status(400).json({ msg: 'Email já cadastrado ' });
      }
    } catch (err) {
      return res.status(500).json({ msg: 'Erro com MySQL' });
    }

    try {
      const email = await EmailsCopia.create({
        email: req.body.email,
      });
      res
        .status(201)
        .json({ msg: 'Sucesso, email para cópia cadastrado', email });
    } catch (err) {
      return res.status(500).json({ msg: 'Erro com MySQL' });
    }
  },
  async get(req, res) {
    try {
      const emails = await EmailsCopia.findAll();
      res.json(emails);
    } catch (err) {
      return await res.status(500).json({ msg: 'Erro com MySQL' });
    }
  },
  async update(req, res) {
    try {
      if (!req.body.id) {
        return res
          .status(400)
          .json({ msg: 'Erro, o id do email não foi encontrado' });
      }
      await EmailsCopia.update(
        { email: req.body.emailNovo },
        { where: { id: req.body.id } }
      );
      const email = {
        id: req.body.id,
        email: req.body.emailNovo,
      };
      res.json(email);
    } catch (err) {
      return res.status(500).json({ msg: 'Erro com MySQL' });
    }
  },
  async delete(req, res) {
    try {
      if (!req.body.id) {
        return res
          .status(400)
          .json({ msg: 'Erro, o id do email não foi encontrado' });
      }
      await EmailsCopia.destroy({ where: { id: req.body.id } });
      res.status(200).json({ msg: 'Sucesso, email deletado' });
    } catch (err) {
      return res.status(500).json({ msg: 'Erro com MySQL' });
    }
  },
};

module.exports = emailsCopia;
