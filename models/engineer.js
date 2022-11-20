const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('engineer', {
        engineer_id: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        hp: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'engineer',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "engineer_id" },
                ]
            },
        ]
    });
};