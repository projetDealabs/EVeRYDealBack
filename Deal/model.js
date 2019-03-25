// importer mongoose
const mongoose = require('mongoose');

// passer en parametre un obj qui contient les différents champs 
let dealSchema = new mongoose.Schema({
	name : String,
	prix : String,
	//description : String,
	//lien : String,
	
	//picture : String,
	//dateFin : Date,
	compteur : Number,
});

let Deal = mongoose.model('Deal', dealSchema);
module.exports = Deal; //exporter mon model
