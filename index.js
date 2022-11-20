const express = require('express');
const app = express();

const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRouter = require('./src/routes/authRouter');
const inspectionRouter = require('./src/routes/inspectionRouter');
const engineerRouter = require('./src/routes/engineerRouter');
const memoRouter = require('./src/routes/memoRouter');
const partRouter = require('./src/routes/partRouter');
const fixRouter = require('./src/routes/fixRouter');

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
app.use(cookieParser());

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
app.use('/auth', authRouter);
app.use('/inspection', inspectionRouter);
app.use('/engineer', engineerRouter);
app.use('/memo', memoRouter);
app.use('/part', partRouter);
app.use('/fix', fixRouter);

app.get('/', (req, res) => {res.send('SERVER 연결');});
app.listen(PORT, () => {console.log(`listening on ${PORT}`);});