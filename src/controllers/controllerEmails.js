const Emails = require('../models/PortalEmails');
const Groups = require('../models/GroupEmail');
const EmailsCopia = require('../models/EmailsCopia');
const EmailsEnviados = require('../models/PortalEmailsEnviados');
const dataAtual = require('../controllers/date');
// const search = require('./controllersSearch')
const controlersSendEmail = require('./controllerSendEmail');
const controllerReport = require('./controllerReport');
// const PortalEmails = require("../models/PortalEmails");

const emails = {
  async create(req, res) {
    if (!req.body.email || !req.body.cod_cli) {
      return res.status(400).json({ msg: 'Campos vazios não são permitidos!' });
    }
    try {
      const email = await Emails.findOne({
        where: { email: req.body.email, cod_cli: req.body.cod_cli },
      });

      if (email) {
        return res.status(400).json({ msg: 'Email já cadastrado' });
      }
    } catch (err) {
      return res.status(500).json({ msg: 'Error mysql' });
    }

    try {
      const email = await Emails.create({
        orcamento: req.body.orcamento,
        email: req.body.email,
        cod_cli: req.body.cod_cli,
      });
      return res.json({ msg: 'Sucesso, email cadastrado', email });
    } catch (error) {
      return res.status(400).json({ msg: 'Error, não foi possível cadastrar' });
    }
  },
  async get(req, res) {
    if (!req.query.cod_cli) {
      return res
        .status(400)
        .json({ msg: 'Error, Não foi recebido o Orcamento' });
    }
    try {
      const emails = await Emails.findAll({
        // where: { orcamento: req.query.orcamento },
        where: { cod_cli: req.query.cod_cli },
      });
      res.json(emails);
    } catch (error) {
      console.log(error);
      return await res
        .status(400)
        .json({ msg: 'Error, não foi possível buscar o cliente' });
    }
  },
  async update(req, res) {
    if (!req.body.id) {
      return res.status(400).json({ msg: 'Error, está faltando o id' });
    }
    try {
      await Emails.update(
        { email: req.body.emailNovo },
        { where: { id: req.body.id } }
      );
      return res.json({ msg: 'Email Atualizado com sucesso' });
    } catch (error) {
      return res.status(400).json({ msg: 'Erro com ' });
    }
  },
  async delete(req, res) {
    if (!req.query.id) {
      return res.status(400).json({ msg: 'Error, está faltando o id' });
    }
    try {
      await Emails.destroy({ where: { id: req.query.id } });
      res.json({ msg: 'Sucesso, email deletado!' });
    } catch (error) {
      res.status(400).json({ msg: 'Error, não foi possível detelar' });
    }
  },

  async getEmailsEnviados(req, res) {
    if (!req.query.orcamento)
      return res.status(400).json({ msg: 'Error, Sem orçamento' });

    try {
      const emailsEnviados = await Emails.findAll({
        where: {
          orcamento: req.query.orcamento,
          emailEnviado: 1,
        },
      });
      res.status(200).json(emailsEnviados);
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: 'Error, não foi possivel buscar no banco' });
    }
  },

  async updateEmailsEnviados(req, res) {
    try {
      const teste = await Emails.update(
        { emailEnviado: 1 },
        { where: { orcamento: req.body.orcamento } }
      );
      res.status(200).json({ msg: 'Certo', teste });
    } catch (error) {
      return res.status(400).json({ msg: 'Error, campos vazios' });
    }
  },

  async createEmailsEnviados(req, res) {
    const data = new Date();
    try {
      await EmailsEnviados.create({
        id_grupo: req.body.groupSelect,
        orcamento: req.body.orcamento,
        emailCli: req.body.emailCli,
        emailSol: req.body.emailSol,
        data_envio: data,
      });
      return res.json({ msg: 'Email Enviado com sucesso' });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ msg: 'Error, não foi possivel enviar o email' });
    }
  },

  async getEmailsEnviados(req, res) {
    if (!req.query.orcamento)
      return res.status(400).json({ msg: 'Error, Sem orçamento' });

    try {
      const emailsEnviados = await EmailsEnviados.findAll({
        where: {
          orcamento: req.query.orcamento,
        },
      });
      res.status(200).json(emailsEnviados);
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: 'Error, não foi possivel buscar no banco' });
    }
  },

  async sendEmail(req, res) {
    if (
      !req.body.orcamento ||
      !req.body.nome_empresa ||
      !req.body.cod_cli ||
      // !req.body.emailCli ||
      !req.body.token ||
      !req.body.senha ||
      !req.body.solicitante ||
      !req.body.cliente
    ) {
      return res
        .status(400)
        .json({ msg: 'Error, Campos vazios não são permitidos!' });
    }
    let email = '';
    if (req.body.groupSelect) {
      email = await Groups.findAll({
        where: { id_grupo: req.body.groupSelect },
      });
    }
    const emailsSalvos = await Emails.findAll({
      where: { cod_cli: req.body.cod_cli },
    });
    const emailCopia = await EmailsCopia.findAll();

    const em = email ? email.map((e) => e.email).toString() : '';
    const emails =
      req.body.emailCliSol +
      emailsSalvos.map((e) => e.email).toString() +
      ',' +
      em;

    const isEmail = await controlersSendEmail.enviarEmail(
      req.body.orcamento,
      req.body.numprocesso,
      req.body.token,
      req.body.senha,
      req.body.cliente,
      req.body.solicitante,
      emails,
      req.body.nome_empresa,
      emailCopia.map((e) => e.email).toString()
    );

    if (isEmail) {
      // res.status(200).json({ msg: 'Sucesso, Relatório gravado e enviado com sucesso' });
      controllerReport.putStatus(req, res);
    } else {
      res.status(400).json({
        msg: 'Erro, Email não foi enviado',
      });
    }
  },
};

module.exports = emails;
