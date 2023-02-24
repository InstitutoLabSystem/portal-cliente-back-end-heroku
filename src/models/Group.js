const { Model, DataTypes } = require('sequelize')

class Group extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        descricao: {
          type: DataTypes.STRING(100),
          primaryKey: true,
          allowNull: false,
          autoIncrement: false,
        },
      },
      {
        sequelize,
        tableName: 'portal_grupo',
      },
    )
  }
}
module.exports = Group
