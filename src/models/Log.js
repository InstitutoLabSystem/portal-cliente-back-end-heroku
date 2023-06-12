const { Model, DataTypes } = require('sequelize')

class Log extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            orcamento: {
                type: DataTypes.STRING(120),
                primaryKey: false,
                allowNull: false,
                autoIncrement: false,
            },
            data_criacao: DataTypes.DATE,
            responsavel: DataTypes.STRING,
            status: DataTypes.STRING,
        },
            {
                sequelize,
                tableName: 'portal_acessos_log',
            }
        )
    }
}

module.exports = Log