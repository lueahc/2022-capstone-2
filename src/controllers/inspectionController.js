const inspectionService = require('../services/inspectionService');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');
require('dotenv').config();

var storage = multer.diskStorage({  //저장 방식
    destination: (req, file, callBack) => { //저장 위치
        callBack(null, 'images/')
    },
    filename: (req, file, callBack) => {    //저장 파일명
        const ext = path.extname(file.originalname);
        callBack(null, path.basename(file.originalname, ext) + '-' + Date.now() + ext)  //`${Date.now()}-${file.originalname}`
    }
})

const fileFilter = (req, file, callBack) => {   //확장자 필터링
    // const typeArray = file.mimetype.split('/');
    // const fileType = typeArray[1];

    if (file.mimetype.lastIndexOf('image') > -1) {
        req.fileValidationError = null;
        callBack(null, true);
    }
    else {
        req.fileValidationError = 'error';
        callBack(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).single('filename');

const inspectionController = {
    //TODO: 에러 처리
    
    toFlask: async(req, res, next) => {
        //TODO: file 없을 경우
        // if(!req.file.filename) {
        //     return res.send('IMAGE_EMPTY');
        // }

        upload(req, res, err => {
            if(req.fileValidationError == 'error') {
                return res.send('IMAGE_UPLOAD_ERROR');
            } else {
                const filename = `images/${req.file.filename}`;
                const formData = new FormData();
                formData.append('file', fs.createReadStream(filename));
            
                axios({
                    method: 'post',
                    url: process.env.FLASK_SERVER,
                    headers: {
                        'Content-Type': 'multipart/form-data; boundary=' + formData.getBoundary()
                    },
                    data: formData
                })
                .then(response => {
                    const modelData = response.data;

                    req.modelData = modelData;
                    next();
                })
            }
        })
    },

    toAndroid: async(req, res) => {
        const modelData = req.modelData;
        const data = {
            testerId: memberId,
            part: part,
            result: result,
            offset: offset,
            limit: limit
        }

        const inspection = await inspectionService.createInspection(data);

        const resData = {
            result: inspection
        }

        return res.send(resData);
    },

    getList: async(req, res) => {
        //const memberId = req.memberId;
        const memberId = 3;
        const part = req.query.part;
        const result = req.query.result;
        //TODO: limit
        let offset = 1;
        let limit = 5;

        if(!part && !result) sort = 'all';
        else if(!result) sort = 'part';
        else if(!part) sort = 'result'
        else sort = 'both';

        const data = {
            testerId: memberId,
            part: part,
            result: result,
            offset: offset,
            limit: limit
        }

        const inspectionList = await inspectionService.retrieveInspectionList(data, sort);
        const resData = {
            result: inspectionList
        }

        return res.send(resData);
    },

    getListById: async(req, res) => {
        const testId = req.params.testId;

        const inspectionDetails = await inspectionService.retrieveInspectionDetails(testId);
        const resData = {
            result: inspectionDetails
        }

        return res.send(resData);
    }
}

module.exports = inspectionController;