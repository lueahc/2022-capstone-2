const partcontroller = require("../controllers/partcontroller.js");

const partrouter = require("express").Router();

partrouter.post("/addnewpart",partcontroller.addnewpart);
partrouter.get("/getallparts",partcontroller.getallparts);
partrouter.get("/:part_id",partcontroller.getPart);
partrouter.put("/:part_id",partcontroller.updatePart);
partrouter.delete("/:part_id",partcontroller.deletePart);
partrouter.get("/list",partcontroller.getlist);
module.exports = partrouter;