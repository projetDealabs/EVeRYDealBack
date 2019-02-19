
//Définition des modules
const express = require("express"); 
const app = express();
const mongoose = require("mongoose"); 
const nunjucks = require('nunjucks'); //permet de generer nos pages web, inclure des donnés à l’interrieur …
//const bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres   
const multer = require('multer'); // gere les champs de type fichier 

//permet de traiter les champs de type fichier et d’enregistrer ce fichier dans un rep dans notre appli
const upload = multer({ 

dest: __dirname + '/uploads'
});

//connexion à la BDD
mongoose.connect('mongodb://localhost/dealabs'); 

//app.use(bodyParser.urlencoded());
app.use(upload.single('file')); // enregistrer les fichier 'file' dans le dossier uploads

//acceder au fichier bootstrap.min.css depuis un navigateur   
app.use('/css', express.static(__dirname +'/node_modules/bootstrap/dist/css'));

//utiliser les routeurs dèja définis 
app.use('/',require('./routes/deals'));


app.use('/uploads', express.static(__dirname + '/uploads')); 

//configuration de nunjucks
nunjucks.configure('vues',{
	autoescape : true,    //echaper les caractère html presents dans dif const
	express : app		//
});

//Définition et mise en place du port d'écoute

app.listen(3000);
