const memocontroller = require("../controllers/memoController.js");

const memorouter = require("express").Router();



memorouter.post("/",memocontroller.AddNewMemo);

memorouter.put("/:memo_id",memocontroller.updateMemo);

memorouter.delete("/:memo_id",memocontroller.deleteMemo);

module.exports = memorouter;