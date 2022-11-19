const memocontroller = require("../controllers/memocontroller.js");

const memorouter = require("express").Router();



memorouter.post("",memocontroller.AddNewMemo);

memorouter.get("/getallmemoes",memocontroller.getAllMemoes);

memorouter.get("/:memo_id",memocontroller.getMemo);

memorouter.put("/:memo_id",memocontroller.updateMemo);

memorouter.delete("/:memo_id",memocontroller.deleteMemo);

//memorouter.post("/test",memocontroller.memotest);

module.exports = memorouter;