const multer = require('multer');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const Relatorio = require('../models/Relatorio'); // ajuste para o nome do seu model

// ─── Configuração do cliente S3 ───────────────────────────────────────────────
const s3 = new S3Client({
  region: process.env.AWS_REGION, 
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME; 
const BUCKET_FOLDER = 'relatorios-clientes';

// Tempo de expiração da URL: 6 meses em segundos (180 dias)
// const URL_EXPIRATION_SECONDS = 60 * 60 * 24 * 180;
const URL_EXPIRATION_SECONDS = 604800;
// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Faz upload de um arquivo para o S3 e retorna a key do objeto.
 */
async function uploadToS3(file, orcamento) {
  const ext = path.extname(file.originalname);
  const uniqueName = `${uuidv4()}${ext}`;
  const s3Key = `${BUCKET_FOLDER}/${orcamento}/${uniqueName}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: s3Key,
    Body: file.buffer,
    ContentType: file.mimetype,
    Metadata: {
      originalname: file.originalname,
      orcamento: orcamento,
    },
  });

  await s3.send(command);
  return { s3Key, uniqueName };
}

/**
 * Gera uma URL pré-assinada temporária para um objeto já existente no S3.
 * Expira em 6 meses (180 dias).
 */
async function generatePresignedUrl(s3Key) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: s3Key,
  });

  const url = await getSignedUrl(s3, command, {
    expiresIn: URL_EXPIRATION_SECONDS,
  });

  return url;
}

// ─── Controller ───────────────────────────────────────────────────────────────
const uploads = {
  async uploadFile(req, res) {
    try {
      const { body, files } = req;

      if (!files || files.length === 0) {
        return res.status(400).json({ msg: 'Nenhum arquivo enviado.' });
      }

      if (!body.orcamento) {
        return res.status(400).json({ msg: 'Campo "orcamento" é obrigatório.' });
      }

      const results = [];

      for (const file of files) {
        // 1. Faz upload para o S3
        const { s3Key, uniqueName } = await uploadToS3(file, body.orcamento);

        // 2. Gera URL pré-assinada (6 meses)
        const presignedUrl = await generatePresignedUrl(s3Key);

        // 3. Calcula a data de expiração (hoje + 180 dias)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 180);

        // 4. Salva no banco de dados
        const registro = await Relatorio.create({
          orcamento: body.orcamento,
          arquivo_nome_original: file.originalname,
          arquivo_nome_s3: uniqueName,
          arquivo_s3_key: s3Key,
          arquivo_url: presignedUrl,
          arquivo_url_expira_em: expiresAt,
          arquivo_tamanho: file.size,
          arquivo_mimetype: file.mimetype,
          uploaded_at: new Date(),
        });

        results.push({
          id: registro.id,
          nomeOriginal: file.originalname,
          s3Key,
          url: presignedUrl,
          expiraEm: expiresAt,
        });
      }

      return res.status(200).json({
        msg: 'Arquivo(s) enviado(s) com sucesso!n',
        results,
      });

    } catch (error) {
      console.error('Erro ao fazer upload para o S3:', error);
      return res.status(500).json({ msg: 'Erro ao fazer upload para o S3.' });
    }
  },

  /**
   * Rota auxiliar: regenera uma URL pré-assinada para um arquivo já salvo.
   * Útil quando a URL expirar após os 6 meses.
   * GET /uploads/refreshUrl/:id
   */
  async refreshUrl(req, res) {
    try {
      const registro = await Relatorio.findByPk(req.params.id);

      if (!registro) {
        return res.status(404).json({ msg: 'Arquivo não encontrado.' });
      }

      const novaUrl = await generatePresignedUrl(registro.arquivo_s3_key);

      const novaExpiracao = new Date();
      novaExpiracao.setDate(novaExpiracao.getDate() + 180);

      await registro.update({
        arquivo_url: novaUrl,
        arquivo_url_expira_em: novaExpiracao,
      });

      return res.json({
        msg: 'URL renovada com sucesso!',
        url: novaUrl,
        expiraEm: novaExpiracao,
      });

    } catch (error) {
      console.error('Erro ao renovar URL:', error);
      return res.status(500).json({ msg: 'Erro ao renovar URL.' });
    }
  },
};

module.exports = uploads;
