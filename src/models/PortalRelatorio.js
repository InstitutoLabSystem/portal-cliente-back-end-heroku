const { Model, DataTypes } = require('sequelize')

class PortalRelatorio extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        id_portal_acessos: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'portal_acessos', key: 'id' },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        orcamento: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        revisao: DataTypes.INTEGER(11),
        upload_data: DataTypes.DATE,
        upload_nome: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'portal_relatorios',
      },
    )
  }
}
module.exports = PortalRelatorio
