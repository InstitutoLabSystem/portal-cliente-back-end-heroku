const Relatorios = require('../models/Relatorio');
const portalrelatorio = require('./controllerPortalRelatorio');
const EmailsEnviados = require('../models/PortalEmailsEnviados');
const dataAtual = require('../controllers/date');
// const emails = require('./controllerEmails')
// const search = require('./controllersSearch')

const relatorios = {
  async novoRelatorio(req, res) {
    if (
      !req.file ||
      !req.body.dateAtual ||
      !req.body.orcamento ||
      !req.body.responsavel ||
      !req.body.upload_vencimento ||
      !req.body.nome_empresa ||
      !req.body.descricao_os ||
      !req.body.token ||
      !req.body.senha
    ) {
      return res
        .status(400)
        .json({ msg: 'Error, Campos vazios não são permitidos!' });
    }

    const dataHora = req.body.dateAtual.split('T');
    const data = dataHora[0] + 'T';
    const hora = dataHora[1].split(':')[0] - 3;
    const minutos = dataHora[1].split(':')[1];
    const segundo = dataHora[1].split(':')[2];
    const horario = hora + ':' + minutos + ':' + segundo;
    const date = data + horario;
    console.log(date);

    try {
      const relatorio = await Relatorios.create({
        orcamento: req.body.orcamento,
        token: req.body.token,
        senha: req.body.senha,
        descricao_os: req.body.descricao_os,
        laboratorio: req.body.laboratorio,
        data_criacao: date,
        data_vencimento: req.body.upload_vencimento,
        responsavel: req.body.responsavel,
        status: 0,
        link_relatorio:
          'https://labsystem.s3.us-east-1.amazonaws.com/' + req.file.key,
      });

      const sucesso = await portalrelatorio.upload(
        req.body.orcamento,
        req.body.responsavel,
        relatorio.id
      );

      if (sucesso) {
        return res
          .status(201)
          .json({ msg: 'Sucesso, Relatório gravado', relatorio });
      } else {
        return res
          .status(400)
          .json({ msg: 'Ocorreu um erro em salvar no banco' });
      }
    } catch (error) {
      return res
        .status(400)
        .json({ msg: 'Error, não foi possível cadastrar o relatório' });
    }
  },
  async get(req, res) {
    if (isNaN(req.query.username)) {
      try {
        const relatorio = await Relatorios.findAll({
          where: { token: req.query.username, senha: req.query.senha },
        });
        return res.json(relatorio);
      } catch (error) {
        console.log(error);
        res
          .status(400)
          .json({ msg: 'Não foi possível fazer a busca os relatórios!' });
      }
    } else {
      try {
        const relatorio = await Relatorios.findAll({
          where: { orcamento: req.query.username, senha: req.query.senha },
        });
        return res.json(relatorio);
      } catch (error) {
        console.log(error);
        res
          .status(400)
          .json({ msg: 'Não foi possível fazer a busca os relatórios!' });
      }
    }
  },
  async getall(req, res) {
    try {
      const relatorio = await Relatorios.findAll({
        where: { orcamento: req.query.orcamento },
      });
      return res.json(relatorio);
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ msg: 'Não foi possível fazer a busca os relatórios!' });
    }
  },
  async delete(req, res) {
    if (req.query.id) {
      try {
        Relatorios.destroy({
          where: {
            id: req.query.id,
          },
        });
        return res.json({ msg: 'Deletado com sucesso' });
      } catch (error) {
        return res
          .status(400)
          .json({ msg: 'Não foi possível deletar o id especificado' });
      }
    } else {
      res.json({ msg: 'Nenhum id foi passado' });
    }
  },

  async putStatus(req, res) {
    if (!req.body.orcamento) {
      return res
        .status(400)
        .json({ msg: 'Error, Campos vazios não são permitidos!' });
    }
    let relatorio = '';
    try {
      relatorio = await Relatorios.findAll({
        where: {
          orcamento: req.body.orcamento,
        },
      });
      if (relatorio) {
        await Relatorios.update(
          { status: 1 },
          {
            where: { orcamento: req.body.orcamento },
          }
        );
        relatorio = {
          orcamento: req.body.orcamento,
          status: 1,
        };
        const data = new Date();
        await EmailsEnviados.create({
          id_grupo: req.body.groupSelect,
          orcamento: req.body.orcamento,
          emailCli: req.body.emailCliSol,
          data_envio: data,
        });
        return res.json({ msg: 'Email Enviado com sucesso' });
      }
    } catch (error) {
      return res
        .status(400)
        .json({ msg: 'Error, não foi possivel enviar o email' });
    }
  },
};

module.exports = relatorios;
