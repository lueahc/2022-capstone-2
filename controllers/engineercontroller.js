const db = require("../models");
const engineer = require("../models/engineer");
const Engineer = db.engineers;
const resData = {
    result : "default"
}
// const addnewEngineer = async (req,res) =>{
//     resData.result = "result : check input condition" //preconditon
//     if (!req.body.id) return res.status(404).send(resData)
//     if (!req.body.name) return res.status(404).send(resData)
//     if (!req.body.hp) return res.status(404).send(resData)
//     let info =  {
//     id : req.body.id,
//     name : req.body.name,
//     hp : req.body.hp,
// };
// await Engineer.create(info).catch((err)=>console.log(err));
// resData.result = "result : added"
// res.status(201).send(resData);
// };

// const getAllEngineers = async(req,res)=>{ 
//     let engineer = await Engineer.findAll({}).catch((err)=>console.log(err));
//     res.status(200).send(engineer);
// };
// const getEngineer = async(req,res)=>{
//     resData.result = "result : check input condition"
//     if (!req.params.id) return res.status(404).send(resData)
//     const tmp = await Engineer.findOne({
//         where:{
//             id : req.params.id
//         },
//         raw:true
//     }).catch((err)=>console.log(err));
//     if (!tmp){
//         resData.result = "result : engineer not found"
//         return res.status(404).send(resData);
//     }
//     else{
//     let engineer = await Engineer.findOne({where : { id : req.params.id}}).catch((err)=>console.log(err));
//     res.status(200).send(engineer);
//     }
// };
const updateEngineer = async(req,res)=>{
    if (!req.params.id) return res.status(404).send(resData)
    const engineer = await Engineer.findOne({
        where:{
            id : req.params.id
        },
        raw:true
    }).catch((err)=>console.log(err));
    if (engineer){
        try{
            await Engineer.update(req.body, {where : {id: req.params.id}}).catch((err)=>console.log(err));
            resData.result = "result : update complete";
            return res.status(200).send(resData);}
            catch(err){
                resData.result = "result : check conditions";
                res.status(412).send(resData)
            }
        }
        else{
            resData.result = "result : user not found"
            return res.status(404).send(resData)
        }
};
// const deleteengineer = async(req,res)=>{
//     if (!req.params.id) return res.status(404).send(resData)
//     const engineer = await Engineer.findOne({
//         where:{
//             id:req.params.id
//         },
//     }).catch((err)=>console.log(err));
//     if (!engineer){
//         resData.result = "result : engineer not found"
//         return res.status(404).send(resData)
//     }
//     await engineer.destroy({ where : { id:req.params.id}}).catch((err)=>console.log(err));
//     resData.result = "result : engineer deleted"
//     res.status(200).send(resData);
// };

module.exports = {
    addnewEngineer,
    getAllEngineers,
    getEngineer,
    updateEngineer,
    deleteengineer,
}