 const testcontroller = require("../controllers/testcontroller.js");

 const testrouter = require("express").Router();

 testrouter.post("",testcontroller.addNewTest);

 testrouter.get("/getAllTests",testcontroller.getAllTests);

 testrouter.get("/:test_id",testcontroller.getTest);

 testrouter.put(":/test_id",testcontroller.updateTest);
 
 testrouter.delete("/:test_id",testcontroller.deleteTest);

 module.exports = testrouter;