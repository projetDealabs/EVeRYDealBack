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
		res.send(deal);
		console.log(deal)
	})
});

router.get('/down/:id', (req,res)=>{
	Deal.findById(req.params.id).populate().then(deal=>{
		deal.compteur=deal.compteur-1;
		deal.save();
		res.send(deal);
		console.log(deal)
	})
});


router.post('/create', (req, res)=>{
	const deal= new Deal({
		name:req.body.name,
		description:req.body.description,
		prix:req.body.prix,
		lien:req.body.lien,
		dateFin:req.body.dateFin,
		compteur:0,
	})
	if(req.file) deal.picture = req.file.filename;
		return deal.save().then(()=> {
		res.send(deal);
	})

});

//expoter le routeur 
module.exports = router;
