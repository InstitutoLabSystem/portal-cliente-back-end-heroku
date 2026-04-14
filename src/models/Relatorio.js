const { DataTypes, Model } = require('sequelize')

class Relatorio extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        orcamento: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        token: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        senha: {
          type: DataTypes.STRING(5),
          allowNull: true,
        },
        descricao_os: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        laboratorio: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        data_criacao: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: DataTypes.NOW,
        },
        data_vencimento: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        responsavel: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        ativo: {
          type: DataTypes.TINYINT,
          allowNull: false,
          defaultValue: 1,
          validate: {
            isIn: [[0, 1]],
          },
        },
        link_relatorio: {
          type: DataTypes.TEXT,          // TEXT para suportar URLs longas (ex: URLs pré-assinadas S3)
          allowNull: true,
        },
        status: {
          type: DataTypes.TINYINT,
          allowNull: false,
          defaultValue: 0,
          validate: {
            isIn: [[0, 1, 2, 3]],        // 0=pendente, 1=ativo, 2=expirado, 3=cancelado
          },
        },

        // ── Campos para o S3 ────────────────────────────────────────────────
        arquivo_nome_original: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        arquivo_s3_key: {
          type: DataTypes.STRING(500),
          allowNull: true,
          comment: 'Caminho completo no bucket S3',
        },
        arquivo_url: {
          type: DataTypes.TEXT,
          allowNull: true,
          comment: 'URL pré-assinada temporária do S3',
        },
        arquivo_url_expira_em: {
          type: DataTypes.DATE,
          allowNull: true,
          comment: 'Data de expiração da URL pré-assinada',
        },
        arquivo_tamanho: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: 'Tamanho do arquivo em bytes',
        },
        arquivo_mimetype: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'portal_acessos',
        timestamps: false,                // já usa data_criacao manual
        indexes: [
          { fields: ['orcamento'] },
          { fields: ['token'] },
          { fields: ['ativo'] },
          { fields: ['arquivo_url_expira_em'] },
        ],
      },
    )
  }

  // ── Métodos utilitários ────────────────────────────────────────────────────

  /** Verifica se o registro está ativo */
  isAtivo() {
    return this.ativo === 1
  }

  /** Verifica se a URL do S3 ainda é válida */
  isUrlValida() {
    if (!this.arquivo_url_expira_em) return false
    return new Date() < new Date(this.arquivo_url_expira_em)
  }

  /** Verifica se o acesso está dentro do prazo de vencimento */
  isVigente() {
    if (!this.data_vencimento) return true
    return new Date() < new Date(this.data_vencimento)
  }
}

module.exports = Relatorio
