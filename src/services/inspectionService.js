const pool = require('../../config/mysql');
const inspectionDao = require('../daos/inspectionDao');

const inspectionService = {
    //TODO: try-catch

    createInspection: async(data) => {
        const connection = await pool.getConnection(async (conn) => conn);

        const inspection = await inspectionDao.insertInspection(connection, data);

        connection.release();

        return inspection;  //[0]
    },

    retrieveInspectionList: async(data, sort) => {
        const connection = await pool.getConnection(async (conn) => conn);
        
        let inspectionList;
        if(sort == 'all') inspectionList = await inspectionDao.selectAllInspection(connection, data);
        else if(sort == 'part') inspectionList = await inspectionDao.selectInspectionSortByPart(connection, data);
        else if(sort == 'result') inspectionList = await inspectionDao.selectInspectionSortByResult(connection, data);
        else if(sort == 'both') inspectionList = await inspectionDao.selectInspectionSortByPartAndResult(connection, data);

        connection.release();

        return inspectionList;
    },

    retrieveInspectionDetails: async(testId) => {
        const connection = await pool.getConnection(async (conn) => conn);
        
        const inspectionDetails = await inspectionDao.selectInspectionById(connection, testId);

        connection.release();

        return inspectionDetails[0];
    },
}

module.exports = inspectionService;