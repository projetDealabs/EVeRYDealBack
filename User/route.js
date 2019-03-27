const app = require('express').Router();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const action = require('./action');


app.post('/users/register', function(req,res, body){
    action.register(req,res);
})

app.post('/users/login', function(req,res){
    action.login(req,res);
})

module.exports = app;