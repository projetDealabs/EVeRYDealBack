// définition des routes
const router = require('express').Router();

const Deal = require('./../models/Deal');
 //définir les routes 
router.get('/',(req, res)=>{ 
	Deal.find({}).then(deals =>{
		res.render('deals/index.html', {deals : deals});
	}) ;

}); 

router.get('/new', (req, res)=>{
	const deal= new Deal();
	res.render('deals/edit.html', {deal: deal, endpoint : '/'});
});

router.get('/edit/:id', (req,res)=>{
Deal.findById(req.params.id). then(deal=>{
	res.render('deals/edit.html',{deal: deal, endpoint :'/'+deal._id.toString()});
})

});
router.get('/delete/:id', (req,res)=>{
Deal.findOneAndRemove({_id: req.params.id}).then(()=>{
	res.redirect('/');
})

});

router.get('/:id', (req, res)=>{
Deal.findById(req.params.id).then(deal=>{
res.render('deals/show.html', {deal: deal})
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
		deal.description = req.body.description;
		deal.prix = req.body.prix;
		deal.lien = req.body.lien;
		deal.dateFin=req.body.dateFin;
		deal.compteur=0; 

		if(req.file) deal.picture = req.file.filename;

		return deal.save().then(()=> {
		res.redirect('/');
	})

});


//expoter le routeur 
module.exports = router;
