const memocontroller = require("../controllers/memoController.js");

const memorouter = require("express").Router();



memorouter.post("/",memocontroller.AddNewMemo);

memorouter.put("/:test_id",memocontroller.updateMemo);

memorouter.delete("/:test_id",memocontroller.deleteMemo);

module.exports = memorouter;