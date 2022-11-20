 const testcontroller = require("../controllers/testController.js");

 const testrouter = require("express").Router();

 testrouter.put(":/test_id",testcontroller.updateTest);
 
 module.exports = testrouter;