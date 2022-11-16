const { member, sequelize } = require('../../models');
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authService = {
    getProfile: async (accessToken) => {
        const options = {   //axios option
            method: 'get',
            url : 'https://kapi.kakao.com/v2/user/me',
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
            json: true,
        };

        try {
            const { data } = await axios(options);  //카카오API 호출
            //const id = data.kakao_account.email;
            return data;
        } catch(err) {
            console.log(err);
            return err;
        }
    },

    findMember: async(memberEmail) => {
        const memberResult = await member.findOne({ where: { id: memberEmail }});
        
        return memberResult;
    },

    issueJwt: async(memberId) => {
        const jwtToken = jwt.sign({
            id: memberId,
        }, process.env.JWT_SECRET, {
            //issuer: '',
        });

        // const jwtOptions = {
        //     //maxAge: process.env.JWT_EXPIRE * 1000,
        //     httpOnly: true,
        //     sameSite: 'none',   //client-server 서로 다른 ip여도 동작
        //     secure: true,   //"
        // };

        return jwtToken;
    },

    createMember: async (data) => {
        const memberResult = member.create({
            id: data.id,
            type: data.type,
            name: data.name,
            empnum: data.empnum,
            hp: data.hp
        })

        return memberResult;
    },

    deleteMember: async(memberId) => {
        const memberResult = await member.update(
            { deleted_at: sequelize.literal('now()') },
            { where: { member_id: memberId } }
        );

        return memberResult;
    }
}

module.exports = authService;