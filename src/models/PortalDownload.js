const { Model, DataTypes } = require('sequelize')

class PortalDownload extends Model {
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
        orcamento: DataTypes.STRING(50),
        download_nome: DataTypes.STRING(100),
        download_data: DataTypes.DATE,
        download_ip: DataTypes.STRING(20),
        download_localizacao: DataTypes.STRING(100),
      },
      {
        sequelize,
        tableName: 'portal_download',
      },
    )
  }
}
module.exports = PortalDownload
