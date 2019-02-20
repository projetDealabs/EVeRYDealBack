// définition des routes
const router = require('express').Router();

const Deal = require('./../models/Deal');
 //définir les routes 
 router.get('/',(req, res)=>{ 
	Deal.find({}).then(deals =>{
		//res.render('deals/index.html', {deals : deals});
		res.send(deals);
	}) ;

});

router.get('/new', (req, res)=>{
	
	res.render('deals/edit.html', { endpoint : '/'});
				//ici tu met le lien vers la page d'édition(formulaire)
	
});
router.get('/edit/:id', (req,res)=>{
	Deal.findById(req.params.id). then(deal=>{
		//res.render('deals/edit.html',{deal: deal, endpoint :'/'+deal._id.toString()});
		res.send(deal);
	})
	
	});

router.delete('/delete/:id', (req,res)=>{
	Deal.find({_id : req.params.id}).deleteOne().then(()=>{
        res.send(Deal);
	},(err)=>{
        res.send("le fichier n'existe pas");
	});
});


router.get('/:id', (req, res)=>{
	Deal.findById(req.params.id).then(deal=>{
	res.send(deal);
	},
	err=> res.status(500).send(err));
	});

//voter un deal 

router.get('/up/:id', (req,res)=>{
	Deal.findById(req.params.id).populate().then(deal=>{
		deal.compteur=deal.compteur+1;
		deal.save();
	})
});

router.get('/down/:id', (req,res)=>{
	Deal.findById(req.params.id).populate().then(deal=>{
		deal.compteur=deal.compteur-1;
		deal.save();
	})
});


router.post('/', (req, res)=>{

	
	const deal= new Deal();
	
		deal.name = req.body.name;
		/*Pdeal.description = req.body.description;
		deal.prix = req.body.prix;
		deal.lien = req.body.lien;
		deal.dateFin=req.body.dateFin;*/

		if(req.file) deal.picture = req.file.filename;

		return deal.save().then(()=> {
		//res.redirect('/');
		res.send(deal);
	})

});

//expoter le routeur 
module.exports = router;
