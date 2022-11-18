const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    verifyToken: async (req, res, next) => {
        const jwtToken = req.headers.authorization;

        if(!jwtToken) {
            return res.send('JWT_EMPTY')
        }

        try {
            const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
            if (decoded) {
                req.memberId = decoded.id;
                req.memberType = decoded.type;
                //console.log(decoded.id);
                next();
            } else {
                return res.send('JWT_VERIFICATION_FAILURE');
            }
        } catch (err) {
            // if (err.message === 'jwt expired') {
            //     console.log('expired token');
            //     //return TOKEN_EXPIRED;
            // } else {
            //     console.log('invalid token');
            //     //return TOKEN_INVALID;
            return res.send('JWT_VERIFICATION_ERROR');
        }
    }
}