const partController = require("../controllers/partController.js");
const partRouter = require("express").Router();

partRouter.get("/getallparts", partController.getAllParts);
partRouter.put("/:part_id", partController.updatePart);

module.exports = partRouter;