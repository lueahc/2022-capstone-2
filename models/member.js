const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('member', {
    member_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "ID"
    },
    id: {
      type: DataTypes.STRING(500),
      allowNull: false,
      comment: "아이디",
      unique: "id"
    },
    pw: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "비밀번호"
    },
    type: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "회원유형"
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "회원이름"
    },
    empnum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "사원번호"
    },
    hp: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "전화번호"
    }
  }, {
    sequelize,
    tableName: 'member',
    timestamps: false,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
      {
        name: "id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
