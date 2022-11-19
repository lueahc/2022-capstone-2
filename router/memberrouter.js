const membercontroller = require("../controllers/membercontroller.js");

const memberrouter = require("express").Router();

memberrouter.post("/addmember",membercontroller.addnewMember);

memberrouter.get("/getallmembers", membercontroller.getAllmembers);

memberrouter.get("/:id",membercontroller.getMember);

memberrouter.put("/:id",membercontroller.updatemember);

memberrouter.delete("/:id",membercontroller.deleteMember);

module.exports = memberrouter;