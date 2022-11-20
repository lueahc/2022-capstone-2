const db = require("../models");
const member = require("../models/member");
const memo = require("../models/memo");
const Memo = db.memoes;
const test = require("../models/test");
const Test = db.testes;
const resData = {
    result :"default"
}

const AddNewMemo = async(req,res)=>{
    resData.result = "result : check input condition"
    if (!req.body.content) return res.status(404).send(resData)
    if (!req.body.writer_id) return res.status(404).send(resData)
    if (!req.body.test_id) return res.status(404).send(resData)
    let info = {
        content : req.body.content,
        writer_id : req.body.writer_id,
        test_id : req.body.test_id
    };
    var memocheck = /^[0-9a-zA-Z~!@#$%^&*()_+|<>?:{}ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{1,50}$/;
    const str  = req.body.content;
    const tmp = await Memo.findOne({
        where: {
            writer_id : req.body.writer_id
        },
        raw:true
    }).catch((err)=>console.log(err));
    if (!tmp){
        resData.result = "result : user doesn't exist"
        return res.status(412).send(resData);
    }
    else{
    if (!memocheck.test(str)){
        resData.result = "result : check input condition"
        return res.status(412).send(resData);
    }
    const memo = await Memo.create(info).catch((err)=>console.log(err));
    const test = await Test.findOne({
        where:{
            test_id : req.body.test_id
        },
        raw:true
    }).catch((err)=>console.log(err));
    if (!test){
        resData.result = "result : test not found"
        return res.status(404).send(resData);
    }
    resData.result = "result : memo added"
    res.status(201).send(resData);
    }
};

const updateMemo = async(req,res)=>{ //test_id 가 넘어옴 test_id memoindex 찾아서 memo update 
    resData.result = "result : check input condition"
    if (!req.params.test_id) return res.stauts(404).sned(resData)
    if (!req.body.content) return res.status(404).send(resData)
    const content = req.body.content
    var memocheck = /^[0-9a-zA-Z~!@#$%^&*()_+|<>?:{}ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{1,50}$/;
    const str  = req.body.content;
    if (!memocheck.test(str)){
        resData.result = "result : check input condition"
        return res.status(412).send(resData);
    }
    const testfind = await Test.findOne({
        where:{
            test_id : req.params.test_id
        },
        raw:true
    }).catch((err)=>console.log(err),res.status(404).send(resData));
    if(!testfind){
        resData.result="result : test doesn't exist"
        return res.status(404).send(resData);
    }
    else{
    const memo = await Memo.update({content : content},{where :{memo_id:testfind.memo_id}}).catch((err)=>console.log(err));
    resData.result = "result : memo updated"
    res.status(200).send(resData);
    }
}
const deleteMemo = async(req,res)=>{
    resData.result = "result : check input condition"
    if(!req.params.test_id) return res.status(404).send(resData);
    let memo_id = req.params.memo_id;
    const testfind = await Test.findOne({
        where:{
            test_id : req.params.test_id
        },
        raw:true
    }).catch((err)=>console.log(err),res.status(404).send(resData));
    if(!testfind){
        resData.result = "result : test doesn't exist"
        return res.status(404).send(resData);
    }
    const memo = await Memo.destroy({
        where:{
            memo_id:testfind.memo_id
        },
        raw:true
    }).catch(
        error=>console.log(error),
        resData.result ="result : can't delete memo",
        res.status(404).send(resData)
    ); // return res.send 더하기 
    resData.result = "result : memo deleted"
    res.status(200).send(resData);
};

module.exports = {
    AddNewMemo,
    updateMemo,
    deleteMemo
}