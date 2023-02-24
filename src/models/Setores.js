const { DataTypes, Model } = require('sequelize')

class Setores extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER(11),
          primaryKey: true,
          allowNull: true,
          autoIncrement: true,
        },
        cadastro: DataTypes.DATE,
        tipo: DataTypes.STRING,
        setor: DataTypes.STRING,
        ativo: DataTypes.INTEGER(4),
      },
      {
        sequelize,
        tableName: 'setores',
      },
    )
  }
}

module.exports = Setores
