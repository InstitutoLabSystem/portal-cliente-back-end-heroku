require('dotenv').config()
const AWS = require('aws-sdk')
const multer = require('multer')
const Relatorios = require('../models/Relatorio');
const Login = require('../models/Login')
const Log = require('../models/Log')
const portalrelatorio = require('./controllerPortalRelatorio');
const EmailsEnviados = require('../models/PortalEmailsEnviados');
const { create, createDelete } = require('./controllerLog');

// ─── Helpers ────────────────────────────────────────────────────────────────

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});
const s3 = new AWS.S3();

const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

// ─── Controller ─────────────────────────────────────────────────────────────

const relatorios = {
  uploadMiddleware,

  /**
   * POST /relatorio/upload
   *
   * Body (multipart/form-data):
   *   arquivo   – arquivo a enviar
   *   orcamento – número do orçamento (usado como prefixo da chave no S3)
   *
   * Retorna:
   *   { msg, url, key } em caso de sucesso
   */
  async uploadFile(req, res) {
    if (!req.file) {
      return res.status(400).json({ msg: 'Nenhum arquivo enviado.' });
    }
    if (!req.body.orcamento) {
      return res.status(400).json({ msg: 'O campo orcamento é obrigatório.' });
    }

    const timestamp = Date.now();
    const sanitizedName = req.file.originalname.replace(/\s+/g, '_');
    const key = `reports-clients/${req.body.orcamento}/${timestamp}_${sanitizedName}`;

    const params = {
      Bucket: process.env.BUCKET,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    try {
      const data = await s3.upload(params).promise();
      return res.status(201).json({
        msg: 'Upload realizado com sucesso.',
        url: data.Location,
        key: data.Key,
      });
    } catch (error) {
      console.error('Erro no upload S3:', error);
      return res.status(500).json({ msg: 'Não foi possível realizar o upload.' });
    }
  },

  async novoRelatorio(req, res) {
    if (
      !req.body.orcamento ||
      !req.body.responsavel ||
      !req.body.upload_vencimento ||
      !req.body.descricao_os ||
      !req.body.token ||
      !req.body.senha
    ) {
      return res
        .status(400)
        .json({ msg: 'Error, Campos vazios não são permitidos!' });
    }

    try {
      const relatorio = await Relatorios.create({
        orcamento: req.body.orcamento,
        token: req.body.token,
        senha: req.body.senha.toUpperCase(),
        descricao_os: req.body.descricao_os,
        laboratorio: req.body.laboratorio,
        data_criacao: new Date(),
        data_vencimento: req.body.upload_vencimento,
        responsavel: req.body.responsavel,
        status: 0,
        link_relatorio: req.body.link_relatorio,
      });

      const loginExistente = await Login.findAll({
        where: { orcamento: req.body.orcamento, senha: req.body.senha },
      });

      if (loginExistente.length === 0) {
        await Login.create({
          token: req.body.token,
          orcamento: req.body.orcamento,
          senha: req.body.senha.toUpperCase(),
          created_at: new Date(),
        });
      }

      const sucesso = await portalrelatorio.upload(
        req.body.orcamento,
        req.body.responsavel,
        relatorio.id
      );
      if (sucesso) {
        await create(
          req.body.orcamento,
          relatorio.data_criacao,
          req.body.responsavel
        );
        return res
          .status(201)
          .json({ msg: 'Sucesso, Relatório gravado', relatorio });
      } else {
        return res
          .status(400)
          .json({ msg: 'Ocorreu um erro em salvar no banco' });
      }
    } catch (error) {
      console.log(error)
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
  async getLogin(req, res) {
    if (isNaN(req.query.username)) {
      try {
        const relatorio = await Login.findAll({
          where: { token: req.query.username, senha: req.query.senha },
        });
        return res.json(relatorio);
      } catch (error) {
        console.log(error);
        res
          .status(400)
          .json({ msg: 'Token/Orçamento ou senha Inválido' });
      }
    } else {
      try {
        const relatorio = await Login.findAll({
          where: { orcamento: req.query.username, senha: req.query.senha },
        });
        return res.json(relatorio);
      } catch (error) {
        console.log(error);
        res
          .status(400)
          .json({ msg: 'Token/Orçamento ou senha Inválido' });
      }
    }
  },
  async delete(req, res) {
    if (!req.query.id || !req.query.key) {
      return res.status(400).json({ msg: 'Nenhum id foi passado' });
    }

    try {
      const relatorio = await Relatorios.findOne({
        where: { id: req.query.id },
      });

      if (!relatorio) {
        return res.status(404).json({ msg: 'Relatório não encontrado' });
      }

      const key = req.query.key.split('.com/')[1];
      await s3.deleteObject({ Bucket: process.env.BUCKET, Key: key }).promise();

      await createDelete(
        relatorio.orcamento,
        relatorio.data_criacao,
        relatorio.responsavel
      );

      await Relatorios.destroy({ where: { id: req.query.id } });
      return res.json({ msg: 'Deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar relatório:', error);
      return res.status(500).json({ msg: 'Não foi possível deletar o id especificado' });
    }
  },
  async createAcesso(req, res) {
    if (!req.body.orcamento || !req.body.senha) {
      return res
        .status(400)
        .json({ msg: 'Error, Campos vazios não são permitidos!' });
    }

    let login;
    try {
      login = await Login.findOne({
        where: { orcamento: req.body.orcamento, senha: req.body.senha },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Error, Não foi possível criar o acesso' });
    }

    if (login) {
      return res
        .status(400)
        .json({ msg: 'Error, Orçamento já possui acesso' });
    }

    try {
      await Login.create({
        token: req.body.token,
        orcamento: req.body.orcamento,
        senha: req.body.senha.toUpperCase(),
        created_at: new Date(),
      });
      return res.status(200).json({ msg: 'Sucesso, Acesso criado' });
    } catch (error) {
      console.log(error)
      return res.status(400).json({ msg: 'Error, Não foi possível criar o acesso' });
    }
  },
  async updateStatus(req, res) {
    if (!req.body.id)
      return res.status(400).json({ msg: 'Error, Campos vazios não são permitidos!' });
    try {
      await Relatorios.update({
        status: 1,
      }, {
        where: { id: req.body.id }
      })
      return res.status(200).json({ msg: 'Sucesso, Status atualizado' });
    } catch (error) {
      console.log(error)
      return res.status(400).json({ msg: 'Error, Não foi possível atualizar o status' });
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
      relatorio = await Relatorios.findOne({
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
        await EmailsEnviados.create({
          id_grupo: req.body.groupSelect,
          orcamento: req.body.orcamento,
          assunto_email: req.body.assunto,
          emailCli: req.body.emailCli ? req.body.emailCli : null,
          emailSol: req.body.emailSol ? req.body.emailSol : null,
          data_envio: new Date(),
        });
        return res.json({ msg: 'Email Enviado com sucesso' });
      }
    } catch (error) {
      return res
        .status(400)
        .json({ msg: 'Error, não foi possivel enviar o email' });
    }
  }
};

module.exports = relatorios;
