/*const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const memorouter = require("./router/memorouter.js");
const engineerrouter = require ("./router/engineerrouter.js");
const memberrouter = require("./router/memberrouter.js");
//app.use("/api", router);
app.use("/user/engineer",engineerrouter);
app.use("/member",memberrouter);
app.use("/user/memo",memorouter);
app.listen(1212), () => {
  console.log(app.get(3306), "번 포트에서 대기 중");
};

module.exports = engineerrouter;
module.exports = memorouter;
module.exports = memberrouter;

///user/memo/test*/