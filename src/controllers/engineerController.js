const db = require("../../models");
const Engineer = db.engineer;

const resData = {
    result: "default"
}

const addNewEngineer = async (req, res) => {
    resData.result = "result : check input condition"
    if (!req.body.name) return res.status(412).send(resData)
    if (!req.body.hp) return res.status(412).send(resData)

    let info = {
        name: req.body.name,
        hp: req.body.hp,
    };

    await Engineer.create(info).catch((err) => {
        console.log(err)
        return res.send(resData);
    }
        // resData.result = "result : can't add engineer",
        // res.status(404).send(resData)
    );

    resData.result = "result : added";
    return res.status(201).send(resData);
};

const getEngineer = async (req, res) => {  //default : 1 
    resData.result = "result : check input condition"

    const tmp = await Engineer.findOne({
        where: {
            engineer_id: 1
        },
        raw: true
    }).catch((err) => {
        console.log(err)
        resData.result = "result : can't find engineer"
        res.status(404).send(resData)
    }
    );

    return res.status(200).send(tmp);
};

const updateEngineer = async (req, res) => {
    if (!req.body.name) return res.status(404).send(resData)
    if (!req.body.hp) return res.status(404).send(resData)

    const info = {
        name: req.body.name,
        hp: req.body.hp
    }

    await Engineer.update({
        name: info.name,
        hp: info.hp
    }, {
        where: {
            engineer_id: 1
        }
    }).catch((err) => {
        console.log(err)
        return res.send(resData);
    })

    return res.send(resData);
};

const deleteEngineer = async (req, res) => {
    await Engineer.destroy({
        where: {
            engineer_id: 1
        }
    }).catch((err) => {
        console.log(err);
        return res.send(resData);
    }
    );

    resData.result = "result : engineer deleted"
    return res.status(200).send(resData);
};

module.exports = {
    addNewEngineer,
    getEngineer,
    updateEngineer,
    deleteEngineer,
}