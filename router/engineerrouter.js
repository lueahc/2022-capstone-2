const engineercontroller = require("../controllers/engineerController.js");

const engineerrouter = require ("express").Router();

engineerrouter.post("/",engineercontroller.addnewEngineer);

//engineerrouter.get("/getallengineers",engineercontroller.getAllEngineers);

engineerrouter.get("/",engineercontroller.getEngineer);

engineerrouter.put("/",engineercontroller.updateEngineer);

engineerrouter.delete("/",engineercontroller.deleteengineer);

module.exports = engineerrouter;