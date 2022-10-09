const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
const memberRouter = require('./routes/member');
const testRouter = require('./routes/test');
const authRouter = require('./routes/auth');
const { sequelize } = require('./models');
const PORT = process.env.PORT || 3000;

//sequelize
sequelize.sync({ force: false })
    .then(() => {
        console.log('DB 연결');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(express.json());

//세션
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

//passport
app.use(passport.initialize());
app.use(passport.session());

//라우터
app.use('/member', memberRouter);
app.use('/test', testRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {res.send('SERVER 연결');});
app.listen(PORT, () => {console.log(`listening on ${PORT}`);});