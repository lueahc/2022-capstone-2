const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
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

        }
    },

    verifyToken: async (jwtToken) => {
        let decoded;
        let result;
        try {
            //jwt.verify(req.headers.authorization, process.env.JWT_SECRET, {ignoreExpiration: true,});
            decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
            result = true;
        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                //return TOKEN_EXPIRED;
            } else {
                console.log('invalid token');
                //return TOKEN_INVALID;
            }
            result = false;
        }
        console.log(result)
        return result;
    }
}