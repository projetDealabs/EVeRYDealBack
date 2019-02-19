// importer mongoose
const mongoose = require('mongoose');

// passer en parametre un obj qui contient les différents champs 
const dealSchema = new mongoose.Schema({
	name : String,
	prix : Number,
	lien : String,
	description : String,
	picture : String,
	dateFin : Date
});

const Deal = mongoose.model('Deal', dealSchema);
module.exports = Deal; //exporter mon model
