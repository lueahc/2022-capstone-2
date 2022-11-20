const db = require("../models");
const member = require("../models/member");
const Member  = db.members;
const memo = require("../models/memo");
const Memo = db.memoes;
const resData = {
    result : "default"
}
const addnewMember = async(req,res) =>{
    resData.result = "result : check input condition"
    if (!req.body.id) return res.status(404).send(resData)
    if (!req.body.type) return res.status(404).send(resData)
    if (!req.body.pw) return res.status(404).send(resData)
    if (!req.body.name) return res.status(404).send(resData)
    if (!req.body.empnum) return res.status(404).send(resData)
    if (!req.body.hp) return res.status(404).send(resData)
    let info = {
        id : req.body.id,
        type : req.body.type,
        pw : req.body.pw,
        name : req.body.name,
        empnum : req.body.empnum,
        hp : req.body.hp,
    };
    const tmp = await Member.findOne({
        where:{
            id : req.body.id
        },
        raw:true
    }).catch((err)=>console.log(err));
    if(tmp){
        resData.result = "result : user already exists"
        return res.status(412).send(resData);
    }
    await Member.create(info).catch(
        (err)=>console.log(err)
        );
    resData.result = "result : user added"
    res.status(201).send(resData);
};

const getAllmembers = async(req,res)=>{
    let member = await Member.findAll({}).catch((err)=>console.log(err));
    res.status(200).send(member);

};

const getMember = async(req,res)=>{
    if (!req.params.id) {
        resData.result = "result : check input condition"
        return res.status(404).send(resData)
    }
    const tmp = await Member.findOne({
        where:{
            id:req.params.id
        },
        raw:true
    }).catch((err)=>console.log(err));
    if(!tmp){
        resData.result = "result : user doesn't exist"
        return res.status(404).send(resData);
    }
    else{
    let member = await Member.findOne({where: { member_id : tmp.member_id}}).catch((err)=>console.log(err));
    res.status(200).send(member);
    }
};

const updatemember = async(req,res)=>{
    resData.result = "result : check input condition"
    if (!req.params.id) return res.status(404).send(resData)
    if (!req.body.type) return res.status(404).send(resData)
    if (!req.body.pw) return res.status(404).send(resData)
    if (!req.body.name) return res.status(404).send(resData)
    if (!req.body.empnum) return res.status(404).send(resData)
    if (!req.body.hp) return res.status(404).send(resData)
    let info = {
        id : req.body.id,
        type : req.body.type,
        pw : req.body.pw,
        name : req.body.name,
        empnum : req.body.empnum,
        hp : req.body.hp,
    };
    const member = await Member.findOne({
        where:{
             id : req.params.id
        },
        raw:true
    }).catch((err)=>console.log(err));
    if(member){
        try{
            await Member.update({id:info.id,type:info.type,pw :info.pw,name:info.name,empnum:info.empnum,hp:info.hp}, { where : {member_id : member.member_id}})
            resData.result = "result : update complete"
            return res.status(200).send(resData);
        }
        catch(err){ 
            resData.result = "result : check input condition"
            res.status(412).send(resData)
        }
    }
    else{
        resData.result = "result : user not found"
        return res.status(404).send(resData)
    }
};
const deleteMember = async (req, res) => {

    if (!req.params.id) {
        resData.result = "result : check input condition"
        return res.status(404).send(resData)
    }
    const member = await Member.findOne({
        where:{
            id:req.params.id
        },
    }).catch((err)=>console.log(err));
    if (!member){
        resData.result = "result : user not found"
        return res.status(404).send(resData)
    }
    const memo = await Memo.findOne({
        where:{
            writer_id:member.id
        },
        raw:true
    }).catch((err)=>console.log(err));
    if (memo){
        resData.result = "result : user has memoes"
        return res.status(406).send(resData);
    }
    await Member.destroy({ where: { member_id: member.member_id } }).catch((err)=>console.log(err))
    resData.result = "result : user deleted"
    res.status(200).send(resData);
  };
  module.exports = { 
    addnewMember,
    getAllmembers,
    getMember,
    updatemember,
    deleteMember,
  };