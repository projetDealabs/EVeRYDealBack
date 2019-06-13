const app = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
ObjectId = mongoose.Types.ObjectId;
app.use(bodyParser.json());
const action = require('./action');
const process = require('./process');
const multer = require('multer');


//----- Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        //cb(null, new Date().toISOString() + file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});
const upload = multer({ storage: storage });

// fin multer



app.post('/create', upload.single('image'), action.creerDeal);

app.put('/update/:id', function (req, res) {
    action.miseAjourDeal(req, res);
})

app.post('/:id/comment', function async  (req, res) {
    action.ajoutComment(req, res);
})

app.get('/:id/comment', function (req, res) {
    action.afficherComment(req, res);
})

app.get('/', function (req,res) {
    action.afficherLesDeal(req,res);
})

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