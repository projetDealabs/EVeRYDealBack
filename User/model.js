//----Import
const mongoose = require('mongoose');

//----Schema d'un Utilisateur 
let UserSchema = new mongoose.Schema({
	id       : String,
	username : String,
	password : String,
	email    : String,
	role     : String,
	token    : String,
	
});
//----Export du modele
let User = mongoose.model('User', UserSchema);
module.exports = User; 