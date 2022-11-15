//검사 내역 추가
async function insertInspection(connection, data) {
    const testerId = data.testId;
    const partId = data.partId;
    
}

//검사 내역 목록 - 전체
async function selectAllInspection(connection, data) {
    const testerId = data.testerId;
    const offset = data.offset;
    const limit = data.limit;

    const query = `
        select
            test_id as testId,
            (select part.name from part where test.part_id = part.part_id) as partName,
            isdefected as isDefected,
            isfixed as isFixed,
            date_format(created_at, '%Y/%m/%d %H:%i:%s') as date
        from test 
        where tester_id = ${testerId} 
        order by test.created_at DESC 
        limit ${offset}, ${limit};
        `
        const [rows] = await connection.query(query);
        return rows;
}

//검사 내역 목록 - 부품 별
async function selectInspectionSortByPart(connection, data) {
    const testerId = data.testerId;
    const part = data.part;
    const offset = data.offset;
    const limit = data.limit;

    const query = `
        select
            test_id as testId,
            (select part.name from part where test.part_id = part.part_id) as partName,
            isdefected as isDefected,
            isfixed as isFixed,
            date_format(created_at, '%Y/%m/%d %H:%i:%s') as date
        from test 
        where tester_id = ${testerId} and test.part_id = ${part} 
        order by test.created_at DESC 
        limit ${offset}, ${limit};
        `
        const [rows] = await connection.query(query);
        return rows;
}

//검사 내역 목록 - 조치 결과 별
async function selectInspectionSortByResult(connection, data) {
    const testerId = data.testerId;
    const result = data.result;
    const offset = data.offset;
    const limit = data.limit;

    const query = `
        select
            test_id as testId,
            (select part.name from part where test.part_id = part.part_id) as partName,
            isdefected as isDefected,
            isfixed as isFixed,
            date_format(created_at, '%Y/%m/%d %H:%i:%s') as date
        from test 
        where tester_id = ${testerId} and test.isfixed = ${result} 
        order by test.created_at DESC 
        limit ${offset}, ${limit};
        `
        const [rows] = await connection.query(query);
        return rows;
}

//검사 내역 목록 - 부품 별 / 조치 결과 별
async function selectInspectionSortByPartAndResult(connection, data) {
    const testerId = data.testerId;
    const part = data.part;
    const result = data.result;
    const offset = data.offset;
    const limit = data.limit;

    const query = `
        select
            test_id as testId,
            (select part.name from part where test.part_id = part.part_id) as partName,
            isdefected as isDefected,
            isfixed as isFixed,
            date_format(created_at, '%Y/%m/%d %H:%i:%s') as date
        from test
        where tester_id = ${testerId} and test.isfixed = ${result} and test.part_id = ${part} 
        order by test.created_at DESC 
        limit ${offset}, ${limit};
        `
        const [rows] = await connection.query(query);
        return rows;
}

//검사 상세 내역
async function selectInspectionById(connection, testId) {
    //TODO: isdefected, isfixed, memo.content null 여부 / defected_id -> defected_type / image

    const query = `
        select
            (select member.name from member where member_id = test.tester_id) as tester,
            (select part.name from part where test.part_id = part.part_id) as partName,
            (select part.stock from part where test.part_id = part.part_id) as partStock,
            isdefected as isDefected,
            isfixed as isFixed,
            date_format(created_at, '%Y/%m/%d %H:%i:%s') as date,
            (select memo.content from memo where test.memo_id = memo.memo_id) as memo,
            test.image as image
        from test 
        where test_id = ${testId};`

        const [rows] = await connection.query(query, [testId]);
        return rows;
}

module.exports = {
    selectAllInspection,
    selectInspectionSortByPart,
    selectInspectionSortByResult,
    selectInspectionSortByPartAndResult,
    selectInspectionById
};