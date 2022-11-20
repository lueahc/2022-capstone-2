const db = require("../../models");
const Part = db.part;

const resData = {
    result: "default"
}

const getAllParts = async (req, res) => {
    let part = await Part.findAll({}).catch(
        (err) => {
            console.log(err)
            return res.send(resData);
        }
    );

    return res.status(200).send(part);
};

const updatePart = async (req, res) => {
    resData.result = "result : check input condition"
    if (!req.params.part_id) return res.status(404).send(resData);
    if (!req.body.stock) return res.status(404).send(resData);

    const info = {
        stock: req.body.stock
    }

    const part = await Part.findOne({
        where: {
            part_id: req.params.part_id
        },
        raw: true
    }).catch((err) => {
        console.log(err)
        return res.send(resData);
    }
    );

    if (part) {
        try {
            await Part.update({
                stock: info.stock
            }, {
                where: {
                    part_id: req.params.part_id
                }
            })
            resData.result = "result : update complete"
            return res.status(200).send(resData);
        } catch (err) {
            resData.result = "result : check input condition"
            res.status(412).send(resData)
        }
    }
    else {
        resData.result = "result : part not found"
        return res.status(404).send(resData)
    }
};

module.exports = {
    getAllParts,
    updatePart
};