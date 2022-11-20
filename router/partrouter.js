const partcontroller = require("../controllers/partController.js");

const partrouter = require("express").Router();

partrouter.get("/getallparts",partcontroller.getallparts);

partrouter.put("/:part_id",partcontroller.updatePart);

module.exports = partrouter;