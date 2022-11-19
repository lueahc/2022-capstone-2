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

const addNewTest = async(req,res) =>{
    resData.result = "result : check input condition"
    if (!req.body.tester_id) return res.status(404).send(resData)
    if (!req.body.tester_id) return res.status(404).send(resData)
    let info = {
        tester_id : req.body.tester_id,
        part_id : req.body.part_id,
        isdefected : req.body.isdefected,
        defected_id : req.body.defected_id,
        isfixed : req.body.isfixed
    };
    const memberfind = await Member.findOne({
        where:{
            id : req.body.tester_id
        },
    }).catch((err)=>console.log(err));
    if(!tmp){
        resData.result = "result : can't find member"
        return res.stauts(404).send(resData);
    }
    await Test.create(info).catch((err)=>console.log(err));
    resData.result = "result : test added"
    res.status(201).send(resData);
};
const getAllTests = async(req,res)=>{
    let test = await Test.findAll({}).catch((err)=>console.log(err));
    res.stauts(200).send(test);
};
const getTest = async(req,res)=>{
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
    return res.status(404).send(resData);
}
else{
    return res.status(200).send(tmp);
}
};
const updateTest = async(req,res)=>{
    resData.result = "result : check input condition"
    if(!req.params.test_id) return res.status(404).send(resData)
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
const deleteTest = async(req,res)=>{
    resData.result = "result : check input condition"
    if (!req.params.test_id) return res.status(404).send(resData)
    const test = await Test.findOne({
        where:{
            test_id : req.params.test_id
        },
    }).catch((err)=>console.log(err));
    if (!test){
        resData.result = "result : test not found"
        return res.status(404).send(resData)
    }
    if(test.memo_id){
        const memofind = await Memo.findOne({
            where:{
                memo_id : test.memo_id
            },
        }).catch((err)=>console.log(err));
        if(memofind){
            await Memo.update({test_id :null},{where: {memo_id:memofind.memo_id}}).catch((err)=>console.log(err));
        }
    }
}
module.exports = {
    addNewTest,
    getAllTests,
    getTest,
    updateTest,
    deleteTest
}