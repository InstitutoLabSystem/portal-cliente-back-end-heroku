const { Model, DataTypes } = require('sequelize')

class PortalEmailsEnviados extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.STRING(25),
          primaryKey: true,
          autoIncrement: false,
        },
        id_grupo: {
          type: DataTypes.INTEGER(20),
          allowNull: true,
          autoIncrement: false,
        },
        orcamento: {
          type: DataTypes.INTEGER(20),
          allowNull: false,
          autoIncrement: false,
        },
        assunto_email: {
          type: DataTypes.STRING(255),
          allowNull: true,
          autoIncrement: false,
        },
        emailCli: {
          type: DataTypes.STRING(100),
          allowNull: true,
          autoIncrement: false,
        },
        emailSol: {
          type: DataTypes.STRING(100),
          allowNull: true,
          autoIncrement: false,
        },
        data_envio: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: 'portal_emails_enviados',
      },
    )
  }
}
module.exports = PortalEmailsEnviados
