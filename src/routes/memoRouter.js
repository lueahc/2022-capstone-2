const memoController = require("../controllers/memoController.js");
const memoRouter = require("express").Router();

memoRouter.post("/", memoController.addNewMemo);
memoRouter.put("/:test_id", memoController.updateMemo);
memoRouter.delete("/:test_id", memoController.deleteMemo);

module.exports = memoRouter;