const db = require("../../models");
const Memo = db.memo;
const Test = db.test;

const resData = {
    result: "default"
}

const addNewMemo = async (req, res) => {
    resData.result = "result : check input condition"
    if (!req.body.content) return res.status(404).send(resData)
    if (!req.body.writer_id) return res.status(404).send(resData)
    if (!req.body.test_id) return res.status(404).send(resData)

    let info = {
        content: req.body.content,
        writer_id: req.body.writer_id,
        test_id: req.body.test_id
    };

    const str = req.body.content;
    var memocheck = /^[0-9a-zA-Z~!@#$%^&*()_+|<>?:{}ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{1,50}$/;
    if (!memocheck.test(str)) {
        resData.result = "result : check input condition"
        return res.status(412).send(resData);
    }

    const memo = await Memo.create(info).catch((err) => {
        console.log(err)
        return res.send(resData);
    });

    const test = await Test.findOne({
        where: {
            test_id: req.body.test_id
        },
        raw: true
    }).catch((err) => {
        console.log(err)
        return res.send(resData);
    });

    if (!test) {
        resData.result = "result : test not found"
        return res.status(404).send(resData);
    }

    await Test.update({
        memo_id: memo.memo_id
    }, {
        where: {
            test_id: test.test_id
        }
    }).catch((err) => {
        console.log(err)
        return res.send(resData);
    });

    resData.result = "result : memo added"
    return res.status(201).send(resData);
};

const updateMemo = async (req, res) => { //test_id 가 넘어옴 test_id memoindex 찾아서 memo update 
    resData.result = "result : check input condition"
    if (!req.params.test_id) return res.status(404).send(resData)
    if (!req.body.content) return res.status(404).send(resData)

    const content = req.body.content
    var memocheck = /^[0-9a-zA-Z~!@#$%^&*()_+|<>?:{}ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{1,50}$/;

    if (!memocheck.test(content)) {
        resData.result = "result : check input condition"
        return res.status(412).send(resData);
    }

    const testfind = await Test.findOne({
        where: {
            test_id: req.params.test_id
        },
        raw: true
    }).catch((err) => {
        console.log(err)
        return res.send(resData);
    });

    if (!testfind) {
        resData.result = "result : test doesn't exist"
        return res.status(404).send(resData);
    }

    await Memo.update({
        content: content
    }, {
        where: {
            memo_id: testfind.memo_id
        }
    }).catch((err) => {
        console.log(err)
        return res.send(resData);
    });

    resData.result = "result : memo updated"
    return res.status(200).send(resData);
}

const deleteMemo = async (req, res) => {
    resData.result = "result : check input condition"
    if (!req.params.test_id) return res.status(404).send(resData);

    const testfind = await Test.findOne({
        where: {
            test_id: req.params.test_id
        },
        raw: true
    }).catch((err) => {
        console.log(err)
        return res.send(resData);
    });

    if (!testfind) {
        resData.result = "result : test doesn't exist"
        return res.status(404).send(resData);
    }

    await Test.update({
        memo_id: null
    }, {
        where: {
            test_id: testfind.test_id
        }
    }).catch((err) => console.log(err))

    await Memo.destroy({
        where: {
            memo_id: testfind.memo_id
        },
        raw: true
    }).catch(error => {
        console.log(error)
        return res.send(resData);
    }
    );

    resData.result = "result : memo deleted"
    return res.status(200).send(resData);
};

module.exports = {
    addNewMemo,
    updateMemo,
    deleteMemo
}