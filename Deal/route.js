const app = require('express').Router();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const action = require('./action');


app.post ('/create', function(req, res){
    action.creerDeal(req, res);
})

app.get('/', function(req, res){
    action.afficherLesDeal(req,res);
})

app.get('/:id', function(req,res){
    action.afficherDeal(req,res);
})

app.get('/up/:id', function(req,res){
    action.voterPlus(req,res);
})

app.get('/down/:id', function(req,res){
    action.voterMoins(req,res);
})





module.exports = app;