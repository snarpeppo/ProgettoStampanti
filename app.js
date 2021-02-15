const express = require('express');
const app = express();
const lpq = require('./api/lpq.js')

app.listen(3001);
app.set('view engine', 'ejs');


app.get('/lpq',(req,res) => {
    const command = lpq();
    console.log('command',command);
    res.render('lpqView',{
        command
    });
});