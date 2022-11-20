const engineerController = require("../controllers/engineerController.js");
const engineerRouter = require("express").Router();

engineerRouter.post("/", engineerController.addNewEngineer);
engineerRouter.get("/", engineerController.getEngineer);
engineerRouter.put("/", engineerController.updateEngineer);
engineerRouter.delete("/", engineerController.deleteEngineer);

module.exports = engineerRouter;