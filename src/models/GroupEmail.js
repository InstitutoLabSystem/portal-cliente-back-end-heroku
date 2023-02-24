const { Model, DataTypes } = require('sequelize')

class GroupEmail extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        email: {
          type: DataTypes.STRING(100),
          primaryKey: true,
          allowNull: false,
          autoIncrement: false,
        },
        id_grupo: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'portal_grupo', key: 'id' },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
      {
        sequelize,
        tableName: 'portal_grupo_email',
      },
    )
  }
}
module.exports = GroupEmail
