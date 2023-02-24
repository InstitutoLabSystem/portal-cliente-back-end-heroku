const { Model, DataTypes } = require('sequelize')

class UsersPermission extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        forekey_user: DataTypes.INTEGER(10),
        nomeUsuario: DataTypes.STRING(100),
        nomeCompleto: DataTypes.STRING(100),
        cargo: DataTypes.STRING(100),
        laboratorio: DataTypes.STRING(100),
      },
      {
        sequelize,
        tableName: 'portal_permissao_usuarios',
      },
    )
  }
}

module.exports = UsersPermission
