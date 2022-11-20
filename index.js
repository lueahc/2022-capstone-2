const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const memorouter = require("./router/memoRouter.js");
const engineerrouter = require ("./router/engineerRouter.js");
const memberrouter = require("./router/memberRouter.js");
const partrouter = require("./router/partRouter.js");
const testrouter = require("./router/testRouter.js");

//app.use("/api", router);

app.use("/engineer",engineerrouter);
app.use("/member",memberrouter);
app.use("/memo",memorouter);
app.use("/part",partrouter);
app.use("/test",testrouter);

app.listen(1212), () => {
  console.log(app.get(3306), "번 포트에서 대기 중");
};

module.exports = partrouter;
module.exports = engineerrouter;
module.exports = memorouter;
module.exports = memberrouter;
module.exports = testrouter;

///user/memo/test///