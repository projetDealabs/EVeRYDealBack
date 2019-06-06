//Définition des modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const multer = require('multer');



//const apiRouter = require('./apiRouter').router;
var http = require('http');

const app = express();
mongoose.connect('mongodb://localhost/dealabs');
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const upload = multer({ 
dest: __dirname + '/uploads'
});
app.use('/uploads', express.static(__dirname + '/uploads')); 

app.use(upload.single('file')); // enregistrer les fichier 'file' dans le dossier uploads
let Deal = require('./Deal/model.js');
//let User = require('./User/model.js');

//utiliser les routeurs dèja définis 
app.use('/', require('./Deal/route'));
app.use('/',require('./User/route'));

//app.use('/api',apiRouter);

//Définition et mise en place du port d'écoute

var server = http.createServer(app);
server.listen(8282, function () {
  console.log("Node server running on http://localhost:8083");
});


module.exports = app;
