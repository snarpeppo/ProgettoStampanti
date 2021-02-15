const express = require('express');
const app = express();
const lpq = require('./api/lpq.js')
const lpstat = require('./api/lpstat.js')

app.listen(3000);
app.set('view engine', 'ejs');


app.get('/lpq',(req,res) => {
    const command = lpq();
    console.log('command',command);
    res.render('lpqView',{
        command
    });
});

app.get('/lpstat',(req,res) => {
    const command = lpstat();
    console.log('command',command);
    res.render('lpqView',{
        command
    });
});