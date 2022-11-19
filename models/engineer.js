const Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){
    return sequelize.define('engineer',{
        engineer_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primarykey: true,
            comment:"index"
        },
        id:{
            type :DataTypes.STRING(500),
            allowNull:false,
            primaryKey:true,
            comment:"아이디",
            unique:"id"
        },
        name:{
            type:DataTypes.STRING(500),
            allowNull: false,
            comment: "이름"
        },
        hp:{
            type:DataTypes.STRING(20),
            allowNull:false,
            comment:"전화번호"
        }
    },{
        sequelize,
        tableName:'engineer',
        timestamps:false,
        paranoid:true,
        indexes:[
            {
                name:"PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    {name : "engineer_id"},
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
    })
}