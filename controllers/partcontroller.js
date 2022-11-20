const db = require("../models");
const part = require("../models/part");
const Part = db.parts;
const resData = {
    result : "default"
}
const getallparts = async(req,res)=>{
    let part = await Part.findAll({}).catch(
        (err)=>console.log(err)
        );
    res.status(200).send(part);
};
const updatePart = async(req,res)=>{
    resData.result = "result : check input condition"
    if (!req.params.part_id) return res.status(404).send(resData);
    if (!req.body.stock) return res.status(404).send(resData);
    const info = {
        stock : req.body.stock
    }
    const part = await Part.findOne({
        where:{
            part_id : req.params.part_id
        },
        raw:true
    }).catch(
        (err)=>console.log(err)
        );
    if (part){
        try{
            await Part.update({stock:info.stock},{where:{part_id : req.params.part_id}})
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
module.exports =  {
    getallparts,
    updatePart
};