const inspectionService = require('../services/inspectionService');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');
const imageToBase64 = require('image-to-base64');
require('dotenv').config();

var storage = multer.diskStorage({  //저장 방식
    destination: (req, file, callBack) => { //저장 위치
        callBack(null, 'images/before/')
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

async function decodeImage(string) {
    const decodedImage = {}
    decodedImage.data = new Buffer.from(string, 'base64');
    return decodedImage;
}

async function encodeImage(path) {
    imageToBase64(path) //인코딩
    .then(
        (response) => {
            console.log(response);
            // const output = Date.now() + "output.txt"
            // fs.writeFileSync(output, response);
            // res.download(output);
            return response;
        }
    )
    .catch(
        (error) => {
            console.log(error);
        }
    )
}

const inspectionController = {
    test: async (req, res) => {
        // const content = 'Hello World';
        // fs.writeFile('images/after/test.txt', content, err => {
        //     if (err) { }
        //     return res.send(content)
        // })

        // fs.readFile('images/after/test.txt', 'utf8', (err, data) => {
        //     if (err) { }
        //     return res.send(data)
        // })        
    },

    toFlask: async (req, res, next) => {
        upload(req, res, err => {
            if (!req.file)
                return res.send('IMAGE_EMPTY');
            if (req.fileValidationError == 'error')
                return res.send('IMAGE_UPLOAD_ERROR');

            const filename = `images/before/${req.file.filename}`;
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
                    req.modelData = response.data;
                    next();
                })
        })
    },

    toAndroid: async(req, res) => {
        console.log(req.modelData);

        //이미지 디코딩 후 저장
        const imageStr = req.modelData['img']['0'];
        const imageBuffer = await decodeImage(imageStr);
        const newFileName = `images/after/${Date.now()}.jpg`;

        fs.writeFile(newFileName, imageBuffer.data, err => {})

        const memberId = req.memberId;  //tester_id
        const defectedType = req.modelData['name']['0'];   //defectedType
        let isDefected, isFixed;    //isdefected, isfixed
        if(defectedType == null) {
            isDefected = 0;
            isFixed = null;
        } else {
            isDefected = 1;
            isFixed = 0
        }
        const partId = await inspectionService.findPart(defectedType);  //part_id

        if(!imageStr) return res.send('IMAGE_EMPTY');

        const insertData = {
            testerId: memberId,
            partId: partId,
            isDefected: isDefected,
            defectedType: defectedType,
            isFixed: isFixed,
            image: newFileName
        }

        const inspection = await inspectionService.createInspection(insertData);

        const testId = inspection.dataValues.test_id;
        const inspectionDetails = await inspectionService.retrieveInspectionDetails(testId);

        inspectionDetails.imageStr = imageStr;

        return res.send(inspectionDetails);
    },

    getList: async(req, res) => {
        //FIXME: const memberId = req.memberId;
        const memberId = 3;
        const memberType = req.memberType;  //사용자0 담당자1
        const part = req.query.part;
        const result = req.query.result;
        const pageInfo = req.query.page;
        const page = parseInt(pageInfo);

        if(!pageInfo) return res.send('PAGE_EMPTY');

        if(!part && !result) sort = 'all';
        else if(!result) sort = 'part';
        else if(!part) sort = 'result'
        else sort = 'both';

        const data = {
            testerId: memberId,
            part: part,
            result: result,
            page: page
        }

        let inspectionList;
        if(memberType == 0) inspectionList = await inspectionService.retrieveInspectionList(data, sort);
        else if(memberType == 1) inspectionList = await inspectionService.retrieveDefectedList(data, sort);

        return res.send(inspectionList);
    },

    getListById: async(req, res) => {
        const testId = req.params.testId;

        const inspectionDetails = await inspectionService.retrieveInspectionDetails(testId);
        const filePath = inspectionDetails.result.image;

        imageToBase64(filePath) //인코딩
        .then(
            (response) => {
                inspectionDetails.imageStr = response;
                return res.send(inspectionDetails);
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )        
    }
}

module.exports = inspectionController;