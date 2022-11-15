const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('test', {
    test_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "검사ID"
    },
    tester_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "검사자ID",
      references: {
        model: 'member',
        key: 'member_id'
      }
    },
    part_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "검사부품ID",
      references: {
        model: 'part',
        key: 'part_id'
      }
    },
    isdefected: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "불량여부"
    },
    defectedType: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "불량유형",
    },
    isfixed: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "조치여부"
    },
    memo_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "메모ID",
      references: {
        model: 'memo',
        key: 'memo_id'
      }
    },
    image: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: "",
      comment: "이미지",
    }
  }, {
    sequelize,
    tableName: 'test',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "test_id" },
        ]
      },
      {
        name: "tester_id",
        using: "BTREE",
        fields: [
          { name: "tester_id" },
        ]
      },
      {
        name: "part_id",
        using: "BTREE",
        fields: [
          { name: "part_id" },
        ]
      },
      {
        name: "memo_id",
        using: "BTREE",
        fields: [
          { name: "memo_id" },
        ]
      },
    ]
  });
};
