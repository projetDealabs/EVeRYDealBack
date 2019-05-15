const process = require('./process');
const Deal = require('./model');

module.exports = {

    creerDeal(req, res) {
        let deal = new Deal({
            name: req.body.name,
            prix: req.body.prix,
            username : req.body.username,
            description: req.body.description,
            lien: req.body.lien,
            dateFin: req.body.dateFin,
            compteur: 0,
        })
        process.creerUnDeal(deal)
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
    },
   
    afficherDeal(req,res) {
        process.afficherUnDeal(req.params.id)
       .then((result)=>{
            res.status(200).json(result)
       })
       .catch((err)=>{
        res.status(400).json(err)
    })
       
    },

    afficherLesDeal(req, res) {
        process.afficherTtLesDeal(req, res);
    },

    miseAjourDeal(req, res) {
        process.miseAjourDeal(req, res);
    },

    supprimerDeal(req, res) {
        process.supprimerDeal(req, res);
    },

    voterPlus(req, res) {
        process.voterPlus(req, res);
    },


    voterMoins(req, res) {
        process.voterMoins(req, res);
    },

    afficherDealsUser(req, res){
        process.afficherDealsUser(req, res);
    }

}