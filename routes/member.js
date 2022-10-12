const express = require('express');
const router = express.Router();

const db = require('../config/mysql');

const models = require('../models');
const { member, Sequelize: { OP } } = require('../models');

router.get('/', async(req, res) => {
    // const id = 'abc123';
    // const name = 'a'
    // const selectMemberSql = 'SELECT id, name FROM member WHERE id=? OR name=?';
    // try {
    //     let [rows] = await db.query(selectMemberSql, [id, name]);
    //     return res.status(200).send(rows);
    // } catch(err) {
    //     console.log(err);
    //     throw err;
    // }
    // let members = await member.findAll();
    // console.log(members);
    // return res.send(members);

    try {
        const users = await member.findAll({
            attributes: ['name', 'created_at'],
        });
        return res.send(users);
    } catch (error) {
        console.log(error)
    }

})

module.exports = router;