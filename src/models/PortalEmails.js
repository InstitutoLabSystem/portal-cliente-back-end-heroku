const { Model, DataTypes } = require('sequelize')

class PortalEmails extends Model {
  static init(sequelize) {
    super.init(
      {
        orcamento: {
          type: DataTypes.STRING(25),
          primaryKey: true,
          allowNull: false,
          autoIncrement: false,
        },
        email: {
          type: DataTypes.STRING(100),
          primaryKey: true,
          allowNull: false,
          autoIncrement: false,
        },
        cod_cli: {
          type: DataTypes.INTEGER(20),
          primaryKey: true,
          allowNull: false,
          autoIncrement: false,
        },
        id: {
          type: DataTypes.INTEGER(8),
          allowNull: false,
          autoIncrement: true,
          primaryKey: false,
        },
        emailEnviado: {
          type: DataTypes.INTEGER(11),
          allowNull: true,
          autoIncrement: false,
        },
      },
      {
        sequelize,
        tableName: 'portal_emails',
      },
    )
  }
}
module.exports = PortalEmails
