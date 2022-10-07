const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const memberRouter = require('./routes/member');
const testRouter = require('./routes/test');

app.use(express.json());
app.use('/member', memberRouter);
app.use('/test', testRouter);

app.get('/', function(req, res) {
    res.send('연결');
});

app.listen(PORT, function() {
    console.log(`listening on ${PORT}`);
});