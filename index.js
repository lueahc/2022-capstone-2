const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', function(req, res) {
    res.send('연결');
});

app.listen(3000, function() {
    console.log('listening on 3000');
});