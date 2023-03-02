const { Model, DataTypes } = require('sequelize')

class EmailsCopia extends Model {
  static init(sequelize) {
    super.init(
      {
        email: {
          type: DataTypes.STRING(100),
          primaryKey: true,
          allowNull: false,
          autoIncrement: false,
        },
        id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          autoIncrement: true,
          primaryKey: false,
        },
      },
      {
        sequelize,
        tableName: 'portal_emails_copia',
      },
    )
  }
}
module.exports = EmailsCopia
