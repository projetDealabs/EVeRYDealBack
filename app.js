
//Définition des modules
const express = require('express'); 
const bodyParser = require('body-parser');
const mongoose = require("mongoose"); 

const app = express();
mongoose.connect('mongodb://localhost/dealabs'); 

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//const multer = require('multer'); // gere les champs de type fichier 
//permet de traiter les champs de type fichier et d’enregistrer ce fichier dans un rep dans notre appli
/*const upload = multer({ 
dest: __dirname + '/uploads'
});
app.use('/uploads', express.static(__dirname + '/uploads')); 
app.use(upload.single('file')); // enregistrer les fichier 'file' dans le dossier uploads*/
let Deal = require('./Deal/model.js');

//utiliser les routeurs dèja définis 
app.use('/',require('./Deal/route'));

//Définition et mise en place du port d'écoute
let param=new Deal();
param.name="frfr";
console.log(param);
app.listen(8080);
