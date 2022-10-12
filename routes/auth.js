const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const tokenAuth = require('../utils/tokenAuth');
const { member } = require('../models');
require('dotenv').config();

router.post('/login', async(req, res) => {
    const accessToken = req.headers['authorization'];
    const tokenResult = await tokenAuth.getProfile(accessToken);
    const memberID = tokenResult.kakao_account.email;

    member.findOne({ where: { id: memberID } })
        .then(result => {
            if (result) {   //if 있는 계정 -> 로그인
                //jwt 발행 및 쿠키
                const token = jwt.sign({
                    id: memberID,
                }, process.env.JWT_SECRET, {
                    //issuer: '',
                });

                const jwtOptions = {
                    //maxAge: process.env.JWT_EXPIRE * 1000,
                    httpOnly: true,
                    sameSite: 'none',   //client-server 서로 다른 ip여도 동작
                    secure: true,   //"
                };

                res.cookie('token', token, jwtOptions);
                return res.sendStatus(200);
            }
            else {  //if 없는 계정 -> 가입 -> 로그인

            }
        });
})

router.post('/sign-up', async(req, res) => {
    const memberID = req.body.id;
    const memberType = req.body.type;
    const memberName = req.body.name;
    const memberEmpnum = req.body.empnum;
    const memberHp = req.body.hp;

    member.create({
        id: memberID,
        type: memberType,
        name: memberName,
        empnum: memberEmpnum,
        hp: memberHp,
    }).then(_ => console.log());

    return res.sendStatus(201);
})


//jwtToken verify 테스트 용
router.post('/verify', async (req, res) => {
    //
    const token = req.headers.token;
    try {
        let decoded = await tokenAuth.verifyToken(token);
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