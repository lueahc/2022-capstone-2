const db = require("../models");
const Test = db.tests;
const member = require("../models/member");
const test = require("../models/test");
const Member = db.members;
const memo = require("../models/memo");
const Memo = db.memoes;
const resData = {
    result : "default"
}
const updateTest = async(req,res)=>{
    resData.result = "result : check input condition"
    if(!req.params.test_id) return res.status(404).send(resData)
    if(!req.body.isdefected) return res.status(404).send(resData)
    // if(!req.body.defected_id) return res.status(404).send(resData)
    if(!req.body.isfixed) return res.status(404).send(resData)
    const info = {
        isdefected : req.body.isdefected,
        defected_id : req.body.defected_id,
        isfixed : req.body.isfixed
    }
    const tmp = await Test.findOne({
        where:{
            test_id : req.params.test_id
        },
        raw:true
    }).catch((err)=>console.log(err));
    if(!tmp){
        resData.result = "result : test doesn't exist"
        return res.status(404).send(resData)
    }
    else{
        await Test.update(req.body,{where:{test_id:req.params.test_id}})
        resData.result = "result : update complete"
        return res.status(200).send(resData)
    }
}
module.exports = {
    updateTest,
};