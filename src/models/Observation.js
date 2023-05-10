const { Model, DataTypes } = require('sequelize') 

class Observation extends Model {
    static init(sequelize){
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                orcamento : {
                    type: DataTypes.STRING(120),
                    primaryKey: false,
                    allowNull: false,
                    autoIncrement: false,
                },
                titulo: {
                    type: DataTypes.STRING(255),
                    primaryKey: false,
                    allowNull: false,
                },
                descricao: {
                    type: DataTypes.TEXT('long'),
                    primaryKey: false,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: 'portal_observacao',
            }
        )

    }
}

module.exports = Observation