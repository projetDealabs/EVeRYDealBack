const app = require('express').Router();
const action = require('./action');
const multer = require('multer');

//----- Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});
const upload = multer({ storage: storage });


app.post('/create', upload.single('image'), action.creerDeal);

app.put('/update/:id',action.miseAjourDeal);

app.post('/:id/comment',action.ajoutComment);

app.get('/:id/comment',action.afficherComment);

app.get('/',action.afficherLesDeal);

app.delete('/supp/:id',action.supprimerDeal);

app.get('/:id',action.afficherDeal);

app.get('/up/:id',action.voterPlus);

app.get('/down/:id',action.voterMoins);

app.get('/userdeals/:username',action.afficherDealsUser);

module.exports = app;