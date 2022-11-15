const authService = require('../services/authService');

const authController = {
    login: async(req, res) => {
        const accessToken = req.headers['authorization'];

        if(!accessToken) {
            return res.send('KAKAO_TOKEN_EMPTY');
        }

        const tokenResult = await authService.getProfile(accessToken);
        const memberEmail = tokenResult.kakao_account.email;
        console.log(`accessToken:${accessToken}, memberEmail:${memberEmail}`);
        const memberResult = await authService.findMember(memberEmail);

        if(!memberResult) {
            return res.send('MEMBER_NOT_EXIST');
        }

        const memberId = memberResult.dataValues.member_id;
        const memberType = memberResult.dataValues.type;
        const memberName = memberResult.dataValues.name;

        const jwtToken = await authService.issueJwt(memberId);

        if(!jwtToken) {
            return res.send('JWT_ISSUE_ERROR');
        }

        const resData = {
            id: memberEmail,
            name: memberName,
            type: memberType,
            jwtToken: jwtToken
        }

        return res.send(resData);
    },

    signUp: async(req, res) => {
        const accessToken = req.headers['authorization'];
        const memberType = req.body.type;
        const memberEmpnum = req.body.empnum;
        const memberHp = req.body.hp;

        if(!accessToken) return res.send('KAKAO_TOKEN_EMPTY');
        if(!memberType) return res.send('MEMBER_TYPE_EMPTY');
        if(!memberEmpnum) return res.send('MEMBER_EMPNUM_EMPTY');
        if(!memberHp) return res.send('MEMBER_HP_EMPTY');

        const tokenResult = await authService.getProfile(accessToken);
        const memberEmail = tokenResult.kakao_account.email;
        const memberName = tokenResult.kakao_account.profile.nickname;  //TODO: 이름?

        const data = {
            id: memberEmail,
            type: memberType,
            name: memberName,
            empnum: memberEmpnum,
            hp: memberHp
        }

        const memberResult = await authService.createMember(data);

        if(!memberResult) {
            return res.send('MEMBER_CREATE_ERROR');
        }

        const memberId = memberResult.dataValues.member_id;
        const jwtToken = await authService.issueJwt(memberId);

        if(!jwtToken) {
            return res.send('JWT_ISSUE_ERROR');
        }

        const resData = {
            id: memberEmail,
            name: memberName,
            type: memberType,
            jwtToken: jwtToken
        }

        return res.status(201).send(resData);
    },

    leave: async(req, res) => {
        const memberId = req.memberId;

        const memberResult = await authService.deleteMember(memberId);

        if(!memberResult) {
            return res.send('MEMBER_DELETE_ERROR');
        }

        const resData = {
            result: 'success'
        }

        return res.send(resData);
    }
}

module.exports = authController;