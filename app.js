//-----Définition des modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const multer = require('multer');
mongoose.connect('mongodb://localhost/dealabs');
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//-----upload image
const upload = multer({ 
dest: __dirname + '/uploads'
});
app.use('/uploads', express.static(__dirname + '/uploads')); 
app.use(upload.single('file')); // enregistrer les fichier 'file' dans le dossier uploads


//-----appel des routes
app.use('/', require('./Deal/route'));  
app.use('/',require('./User/route'));


app.listen(8000);
console.log("serveur démarré sur http://localhost:8282");

module.exports = app;
