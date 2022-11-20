const pool = require('../../config/mysql');
const inspectionDao = require('../daos/inspectionDao');
const { member, test, sequelize } = require('../../models');

const inspectionService = {
    test: async() => {
    },

    findPart: async(defectedType) => {
        let partId;
        switch(defectedType) {
            case '덕트손상':
            case '연결불량':
            case '테이프불량':
                partId = 1; //덕트
                break;
            case '단차':
            case '보강재설치불량':
                partId = 2; //선체
                break;
            case '볼트체결불량':
            case '파이프손상':
                partId = 3; //선박배관
                break;
            case '바인딩불량':
            case '설치불량':
            case '케이블손상':
                partId = 4;    //케이블
                break;
            case '가공불량':
            case '보온재손상':
            case '연계처리불량':
            case '함석처리불량':
                partId = 5;    //보온재
                break;
        }
        return partId;
    },

    createInspection: async(data) => {
        const testResult = await test.create({
            tester_id: data.testerId,
            part_id: data.partId,
            isdefected: data.isDefected,
            defectedType: data.defectedType,
            isfixed: data.isFixed,
            image: data.image
        })

        return testResult;
    },

    selectMemberType: async(memberId) => {
        const memberType = await member.findOne({
            attributes: [ 'type' ],
            where: { member_id: memberId }
        });

        return memberType;
    },

    retrieveInspectionList: async(data, sort) => {
        const pageSize = 10;
        const page = data.page;
        const testerId = data.testerId;

        let start = 0;
        let hasNextPage = true;

        if (page <= 0) page = 1;
        else start = (page - 1) * pageSize;

        const cnt = await test.count({ where: { tester_id: testerId }});
        if (page > Math.round(cnt / pageSize)) return null;
        if ((page + 1) > Math.round(cnt / pageSize)) hasNextPage = false;

        data.start = start;

        const connection = await pool.getConnection(async (conn) => conn);

        let inspectionList;
        if (sort == 'all') inspectionList = await inspectionDao.selectAllInspection(connection, data);
        else if (sort == 'part') inspectionList = await inspectionDao.selectInspectionSortByPart(connection, data);
        else if (sort == 'result') inspectionList = await inspectionDao.selectInspectionSortByResult(connection, data);
        else if (sort == 'both') inspectionList = await inspectionDao.selectInspectionSortByPartAndResult(connection, data);

        connection.release();

        const resData = {
            result: inspectionList,
            hasNextPage: hasNextPage,
            cnt: cnt
        }

        return resData;
    },

    retrieveInspectionDetails: async(testId) => {
        const connection = await pool.getConnection(async (conn) => conn);
        
        const inspectionDetails = await inspectionDao.selectInspectionById(connection, testId);

        connection.release();

        const resData = {
            result: inspectionDetails[0]
        }

        return resData;
    },

    retrieveDefectedList: async(data, sort) => {
        const pageSize = 10;
        const page = data.page;

        let start = 0;
        let hasNextPage = true;

        if (page <= 0) page = 1;
        else start = (page - 1) * pageSize;

        const cnt = await test.count({ where: { isdefected: 1 }});
        if (page > Math.round(cnt / pageSize)) return null;
        if ((page + 1) > Math.round(cnt / pageSize)) hasNextPage = false;

        data.start = start;

        const connection = await pool.getConnection(async (conn) => conn);

        let inspectionList;
        if (sort == 'all') inspectionList = await inspectionDao.selectAllDefected(connection, data);
        else if (sort == 'part') inspectionList = await inspectionDao.selectDefectedSortByPart(connection, data);
        else if (sort == 'result') inspectionList = await inspectionDao.selectDefectedSortByResult(connection, data);
        else if (sort == 'both') inspectionList = await inspectionDao.selectDefectedSortByPartAndResult(connection, data);

        connection.release();

        const resData = {
            result: inspectionList,
            hasNextPage: hasNextPage,
            cnt: cnt
        }

        return resData;
    },
}

module.exports = inspectionService;