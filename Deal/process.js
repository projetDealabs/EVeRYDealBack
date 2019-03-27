const mongoose = require('mongoose');
ObjectId = mongoose.Types.ObjectId;
const Deal = require('./model');

module.exports = {
 afficherUnDeal : (req, res)=>{
	Deal.findById(req.params.id).then(deal=>{
	res.send(deal);
	},
	err=> res.status(500).send(err));
	},

 afficherTtLesDeal :  (req, res)=>{ 
    Deal.find({}).then(deals =>{
            res.send(deals);
        }) ;
    
    },

 creerUnDeal : (req,res)=>{
	let deal= new Deal({
		name:req.body.name,
		prix:req.body.prix,
		description:req.body.description,
		lien:req.body.lien,
		dateFin:req.body.dateFin,
		compteur:0,
	})
	//if(req.file) deal.picture = req.file.filename;
	return deal.save().then(()=> {
		res.send(deal);
	})
	},

	//voter un deal 


voterPlus : (req,res)=>{
	Deal.findById(req.params.id).populate().then(deal=>{
		deal.compteur=deal.compteur+1;
		deal.save();
		res.send(deal);
		console.log(deal)
	})
},


 voterMoins : (req,res)=>{
	Deal.findById(req.params.id).populate().then(deal=>{
		deal.compteur=deal.compteur-1;
		deal.save();
		res.send(deal);
		console.log(deal)
	})
},
	
}
