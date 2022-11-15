var DataTypes = require("sequelize").DataTypes;
var _member = require("./member");
var _memo = require("./memo");
var _part = require("./part");
var _test = require("./test");

function initModels(sequelize) {
  var member = _member(sequelize, DataTypes);
  var memo = _memo(sequelize, DataTypes);
  var part = _part(sequelize, DataTypes);
  var test = _test(sequelize, DataTypes);

  memo.belongsTo(member, { as: "writer", foreignKey: "writer_id"});
  member.hasMany(memo, { as: "memos", foreignKey: "writer_id"});
  part.belongsTo(member, { as: "incharge", foreignKey: "incharge_id"});
  member.hasMany(part, { as: "parts", foreignKey: "incharge_id"});
  test.belongsTo(member, { as: "tester", foreignKey: "tester_id"});
  member.hasMany(test, { as: "tests", foreignKey: "tester_id"});
  test.belongsTo(memo, { as: "memo", foreignKey: "memo_id"});
  memo.hasMany(test, { as: "tests", foreignKey: "memo_id"});
  test.belongsTo(part, { as: "part", foreignKey: "part_id"});
  part.hasMany(test, { as: "tests", foreignKey: "part_id"});

  return {
    member,
    memo,
    part,
    test,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
