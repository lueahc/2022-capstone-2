const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('defected', {
    defected_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "불량ID"
    },
    part_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "불량부품ID",
      references: {
        model: 'part',
        key: 'part_id'
      }
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "불량유형"
    }
  }, {
    sequelize,
    tableName: 'defected',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "defected_id" },
        ]
      },
      {
        name: "part_id",
        using: "BTREE",
        fields: [
          { name: "part_id" },
        ]
      },
    ]
  });
};
