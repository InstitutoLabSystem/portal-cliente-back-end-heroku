const Emails = require('../models/PortalEmails')
const Groups = require('../models/GroupEmail')
// const search = require('./controllersSearch')
const controlersSendEmail = require('./controllerSendEmail')
// const PortalEmails = require("../models/PortalEmails");

const emails = {
  async create(req, res) {
    if (!req.body.email || !req.body.cod_cli) {
      return res.status(400).json({ msg: 'Campos vazios não são permitidos!' })
    }
    try {
      const email = await Emails.findOne({
        where: { email: req.body.email, cod_cli: req.body.cod_cli },
      })

      if (email) {
        return res.status(400).json({ msg: 'Email já cadastrado' })
      }
    } catch (err) {
      return res.status(500).json({ msg: 'Error mysql' })
    }

    try {
      await Emails.create({
        orcamento: req.body.orcamento,
        email: req.body.email,
        cod_cli: req.body.cod_cli,
      })
      return res.json({ msg: 'Sucesso, email cadastrado' })
    } catch (error) {
      return res.status(400).json({ msg: 'Error, não foi possível cadastrar' })
    }
  },
  async get(req, res) {
    if (!req.query.cod_cli) {
      return res
        .status(400)
        .json({ msg: 'Error, Não foi recebido o Orcamento' })
    }
    try {
      const emails = await Emails.findAll({
        // where: { orcamento: req.query.orcamento },
        where: { cod_cli: req.query.cod_cli },
      })
      res.json(emails)
    } catch (error) {
      console.log(error)
      return await res
        .status(400)
        .json({ msg: 'Error, não foi possível buscar o cliente' })
    }
  },
  async update(req, res) {
    if (!req.body.id) {
      return res.status(400).json({ msg: 'Error, está faltando o id' })
    }
    try {
      const email = await Emails.update(
        { email: req.body.emailNovo },
        { where: { id: req.body.id } },
      )
      return res.json({ email })
    } catch (error) {
      return res.status(400).json({ msg: 'Error, campos vazios' })
    }
  },
  async delete(req, res) {
    if (!req.query.id) {
      return res.status(400).json({ msg: 'Error, está faltando o id' })
    }
    try {
      await Emails.destroy({ where: { id: req.query.id } })
      res.json({ msg: 'Sucesso, email deletado!' })
    } catch (error) {
      res.status(400).json({ msg: 'Error, não foi possível detelar' })
    }
  },

  async getEmailsEnviados(req, res) {
    if (!req.query.orcamento && !req.query.portal_acessos)
      return res
        .status(400)
        .json({ msg: 'Error, Sem orçamento ou portal acessos' })

    try {
      const emailsEnviados = await Emails.findAll({
        where: {
          orcamento: req.query.orcamento,
          emailEnviado: 1,
        },
      })
      res.status(200).json(emailsEnviados)
    } catch (error) {
      console.log(error)
      res.status(400).json({ msg: 'Error, não foi possivel buscar no banco' })
    }
  },

  async updateEmailsEnviados(req, res) {
    try {
      const teste = await Emails.update(
        { emailEnviado: 1 },
        { where: { orcamento: req.body.orcamento } },
      )
      res.status(200).json({ msg: 'Certo', teste })
    } catch (error) {
      return res.status(400).json({ msg: 'Error, campos vazios' })
    }
  },

  async sendEmail(req, res) {
    if (
      !req.body.orcamento ||
      !req.body.nome_empresa ||
      !req.body.cod_cli ||
      !req.body.emailCli ||
      !req.body.token ||
      !req.body.senha ||
      !req.body.solicitante ||
      !req.body.cliente
    ) {
      return res
        .status(400)
        .json({ msg: 'Error, Campos vazios não são permitidos!' })
    }
    let em1 = ''
    if (req.body.groupSelect) {
      const email = await Groups.findAll({
        where: { id_grupo: req.body.groupSelect },
      })
      em1 = email.map((e) => e.email)
    }
    const emailsSalvos = await Emails.findAll({
      where: { cod_cli: req.body.cod_cli },
    })

    const em2 = req.body.emailCli
    const em3 = emailsSalvos.map((e) => e.email)
    const emailCopia =
      'tecnico1@labsystem.com.br,tecnico3@labsystem.com.br,qualidade6@labsystem.com.br,qualidade1@labsystem.com.br,dev@labsystem.com.br,labsystem@labsystem.com.br'
    const emails = em1 + ',' + em2.toString() + ',' + em3.toString()

    try {
      await controlersSendEmail.enviarEmail(
        req.body.orcamento,
        req.body.numprocesso,
        req.body.token,
        req.body.senha,
        req.body.cliente,
        req.body.solicitante,
        emails,
        req.body.nome_empresa,
        emailCopia,
      )
      res.json({ msg: 'Sucesso, Relatório gravado e enviado com sucesso' })
    } catch (error) {
      console.log(error)
      res.json({
        msg: 'Erro ao enviar Email',
      })
    }

    // if (isEmail) {
    //   res.json({ msg: 'Sucesso, Relatório gravado e enviado com sucesso' })
    // } else {
    //   res.json({
    //     msg: 'Sucesso, Relatório gravado, mas não foi possível enviar o Email',
    //   })
    // }
  },
}

module.exports = emails
