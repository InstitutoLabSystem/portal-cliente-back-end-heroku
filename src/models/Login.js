const { Model, DataTypes } = require('sequelize')

class Login extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.STRING(100),
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        token: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          autoIncrement: false,
          primaryKey: false,
        },
        orcamento: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          autoIncrement: false,
          primaryKey: false,
        },
        senha: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          autoIncrement: false,
          primaryKey: false,
        },
      },
      {
        sequelize,
        tableName: 'portal_login_acesso',
      },
    )
  }
}
module.exports = Login
