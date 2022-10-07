const express = require('express');
const router = express.Router();

const db = require('../config/mysql');

router.get('/', async(req, res) => {
    const id = 'abc123';
    const name = 'a'
    const selectMemberSql = 'SELECT id, name FROM member WHERE id=? OR name=?';
    try {
        let [rows] = await db.query(selectMemberSql, [id, name]);
        return res.status(200).send(rows);
    } catch(err) {
        console.log(err);
        throw err;
    }
})

module.exports = router;