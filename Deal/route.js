const app = require('express').Router();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const action = require('./action');


app.post('/create', function (req, res) {
    action.creerDeal(req, res);
})

app.get('/', function (req, res) {
    action.afficherLesDeal(req, res);
})
app.put('/update/:id', function (req, res) {
    action.miseAjourDeal(req, res);
});
app.delete('/supp/:id', function (req, res) {
    action.supprimerDeal(req, res);
});
app.get('/:id', function (req, res) {
    action.afficherDeal(req, res);
})

app.get('/up/:id', function (req, res) {
    action.voterPlus(req, res);
})

app.get('/down/:id', function (req, res) {
    action.voterMoins(req, res);
})

// app.get('/userdeal', function (req, res) {
//     action.afficherDealsUser(req, res);
// })
app.get('/userdeals/:username', function (req, res) {
    action.afficherDealsUser(req, res);
})





module.exports = app;