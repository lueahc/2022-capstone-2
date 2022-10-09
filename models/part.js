const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('part', {
    part_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "부품ID"
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "부품이름"
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "재고"
    },
    incharge_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "담당자ID",
      references: {
        model: 'member',
        key: 'member_id'
      }
    }
  }, {
    sequelize,
    tableName: 'part',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "part_id" },
        ]
      },
      {
        name: "incharge_id",
        using: "BTREE",
        fields: [
          { name: "incharge_id" },
        ]
      },
    ]
  });
};
