// importer mongoose
const mongoose = require('mongoose');

let dealSchema = new mongoose.Schema({
    name: String,
    prix: Number,
    username : String,
    description: String,
    lien: String,
    picture: String,
    dateFin: Date,
    compteur: Number,
    comments: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: "Comment is Required"
      }],
      vote:[String],
        
});

let Deal = mongoose.model('Deal', dealSchema);
module.exports = Deal; 
