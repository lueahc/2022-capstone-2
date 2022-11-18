const engineercontroller = require("../controllers/engineercontroller.js");

const engineerrouter = require ("express").Router();

//engineerrouter.post("/addengineer",engineercontroller.addnewEngineer);

//engineerrouter.get("/getallengineers",engineercontroller.getAllEngineers);

//engineerrouter.get("/:id",engineercontroller.getEngineer);

engineerrouter.put("/:id",engineercontroller.updateEngineer);

//engineerrouter.delete("/:id",engineercontroller.deleteengineer);

module.exports = engineerrouter;