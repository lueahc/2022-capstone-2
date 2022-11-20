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
        if (tmp.isfixed=0){
            await Test.update({isfixed:1},{where:{test_id:req.params.test_id}}).catch((err)=>console.log(err))
        }
        else if(tmp.isfixed=1){
            await Test.update({isfixed:0},{where:{test_id:req.params.test_id}}).catch((err)=>console.log(err))
        }
        else{
            resData.result = "result : invalid isfixed state"
            return res.status(404).send(resData.result)
        }
        resData.result = "result : update complete"
        return res.status(200).send(resData)
    }
}
module.exports = {
    updateTest,
};