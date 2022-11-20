const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('memo', {
    memo_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "메모ID"
    },
    content: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "메모내용"
    },
    writer_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "작성자ID",
      references: {
        model: 'member',
        key: 'member_id'
      }
    },
    updated_at:{
      type:DataTypes.DATE,
      allowNull:true,
      comment:"업데이트일"
    }
  }, {
    sequelize,
    tableName: 'memo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "memo_id" },
        ]
      },
      {
        name: "writer_id",
        using: "BTREE",
        fields: [
          { name: "writer_id" },
        ]
      },
    ]
  });
};
