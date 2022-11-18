const db = require("../models");
const part = require("../models/part");
const Part = db.parts;
const resData = {
    result : "default"
}
const addnewpart = async(req,res) =>{
    resData.result = "result : check input condition"
    if (!req.body.part_id) return res.status(404).resData
    if (!req.body.name) return res.status(404).resData
    if (!req.body.stock) return res.status(404).resData
    if (!req.body.incharge_id) return res.status(404).resData
    let info = {
        part_id : req.body.part_id,
        name : req.body.name,
        stock : req.body.stock,
        incharge_id : req.body.incharge_id
    };
    const tmp = await Part.findOne({
        where:{
            part_id : req.body.part_id
        },
        raw:true
    }).catch((err)=>console.log(err));
    if(tmp){
        resData.result = "result : part already exists"
        return res.status(412).send(resData);
    }
    else{
    const part = await Part.create(info).catch((err)=>console.log(err));
    resData.result = "result : part added"
    res.status(201).send(resData);
    }
};
const getallparts = async(req,res)=>{
    let part = await Part.findAll({}).catch((err)=>console.log(err));
    res.status(200).send(part);
};
const getPart = async(req,res)=>{
    resData.result = "result : check input condition"
    if (!req.params.part_id) return res.status(404).resData
    let part_id = req.params.part_id;
    const tmp = await Part.findOne({
        where:{
            part_id:req.params.part_id
        },
        raw:true
    }).catch((err)=>console.log(error));
    if (!tmp){
        resData.result = "result : part doesn't exist"
        return res.status(404).send(resData);
    }
    else{
    let part = await Part.findOne({where: { part_id : part_id}}).catch((err)=>console.log(err));
    res.status(200).send(part);
    }
};
const updatePart = async(req,res)=>{
    resData.result = "result : check input condition"
    if (!req.params.part_id) return res.status(404).send(resData);
    const part = await Part.findOne({
        where:{
            part_id : req.params.part_id
        },
        raw:true
    }).catch((err)=>console.log(err));
    if (part){
        try{
            await Part.update({stock:stock},{where:{member_id : req.params.part_id}})
            resData.result = "result : update complete"
            return res.status(200).send(resData);
        }
            catch(err){
                resData.result = "result : check input condition"
                res.status(412).send(resData)
            }
        }
        else{
            resData.result = "result : part not found"
            return res.status(404).send(resData)
        }
    };
    const deletePart = async(req,res)=>{
        resData.result = "result : check input condition"
        if (!req.params.part_id) return res.status(404).send(resData)
        let part_id = req.params.part_id;
        const part = await Part.findOne({
            where:{
                part_id:part_id
            },
        }).catch((err)=>console.log(err));
        if (!part){
            resData.result = "result : part not found"
            return res.status(404).send(resData)
        }
        await Part.destroy({where: {part_id:part_id}}).catch((err)=>console.log(err))
        resData.result = "result : part deleted"
        res.status(200).send(resData);
    };
    const getlist = async(req,res)=>{
        resData.result = "result : check input condition"
        if(!req.body.part_id) return res.status(404).send(resData);
        part_id = req.body.part_id
        const part = await Part.findOne({
            where:{
                part_id :part_id
            }
        }).catch((err)=>console.log(err));
        if(!part){
            resData.result = "result : part not found"
            return res.status(404).send(resData);
        }
        const resData = result.rows;
        res.status(200).send(resData);
    };
module.exports =  {
    addnewpart,
    getallparts,
    getPart,
    updatePart,
    deletePart,
    getlist
};