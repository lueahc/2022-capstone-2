const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const tokenAuth = require('../utils/tokenAuth');
const { member, sequelize } = require('../models');
require('dotenv').config();

router.post('/login', async(req, res) => {
    const accessToken = req.headers['authorization'];
    const tokenResult = await tokenAuth.getProfile(accessToken);
    const memberID = tokenResult.kakao_account.email;

    console.log(`accessToken:${accessToken}, memberID:${memberID}`);

    member.findOne({ where: { id: memberID }
    }).then(result => {
            const memberType = result.dataValues.type;
            const memberName = result.dataValues.name;

            if (result) {   //if 있는 계정 -> 로그인
                const jwtToken = jwt.sign({
                    id: memberID,
                }, process.env.JWT_SECRET, {
                    //issuer: '',
                });

                // const jwtOptions = {
                //     //maxAge: process.env.JWT_EXPIRE * 1000,
                //     httpOnly: true,
                //     sameSite: 'none',   //client-server 서로 다른 ip여도 동작
                //     secure: true,   //"
                // };

                const resData = {
                    id: memberID,
                    name: memberName,
                    type: memberType,
                    jwtToken: jwtToken,
                }

               // res.cookie('token', token, jwtOptions);
                return res.status(200).send(resData);
            }

            return res.sendStatus(400);    //if 없는 계정
        });
})

router.post('/sign-up', async(req, res) => {
    const accessToken = req.headers['authorization'];
    const tokenResult = await tokenAuth.getProfile(accessToken);
    const memberID = tokenResult.kakao_account.email;
    const memberName = tokenResult.kakao_account.profile.nickname;

    const memberType = req.body.type;
    const memberEmpnum = req.body.empnum;
    const memberHp = req.body.hp;

    member.create({
        id: memberID,
        type: memberType,
        name: memberName,
        empnum: memberEmpnum,
        hp: memberHp,
    }).then(_ => {  //자동로그인
        const jwtToken = jwt.sign({
            id: memberID,
        }, process.env.JWT_SECRET,
        );

        const resData = {
            id: memberID,
            name: memberName,
            type: memberType,
            jwtToken: jwtToken,
        }

        return res.status(201).send(resData);
    });

    //TODO: error 시 return
})

router.post('/leave', async(req, res) => {
    //TODO: const memberID = 

    try {
        await sequelize.transaction(async(t) => {
            const memberResult = await member.findOne({ where: { id: memberId }});
            //TODO: id 부재 시

            await member.update(
                { deleted_at: sequelize.literal('now()') },
                {
                   where: { id: memberId },
                   transaction: t,
                },
             );

             return res.sendStatus(204);
        })
    } catch(err) {
        console.log(err);
        //TODO:
    }
})


//jwtToken verify 테스트 용
router.post('/verify', async (req, res) => {
    const jwtToken = req.headers.jwtToken;

    try {
        let decoded = await tokenAuth.verifyToken(jwtToken);
        console.log(decoded);
        if (decoded) {
            return res.send('성공');
        } else {
            return res.send('실패');
        }
    } catch (err) {
        console.log(err);
        return res.send('err');
    }
});

//accessToken 발급 테스트 용
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

passport.use('kakao', new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        let user = {
            profile: profile._json,
            accessToken: accessToken
        }
        console.log(user.accessToken);
        done(null, user)
    }))

router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', {failureRedirect: '/',}), (req, res) => {res.redirect('/')});
passport.serializeUser((user, done) => {done(null, user);});
passport.deserializeUser((user, done) => {done(null, user);});

module.exports = router;