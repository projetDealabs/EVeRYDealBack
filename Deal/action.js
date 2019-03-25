const process = require ('./process');

module.exports={

  creerDeal(req, res){
    process.creerUnDeal(req, res);
},

 afficherDeal(req,res){
    process.afficherUnDeal(req,res);
},

 afficherLesDeal(req,res){
    process.afficherTtLesDeal(req,res);
},

 voterPlus(req,res){
    process.voterPlus(req,res);
},


voterMoins(req,res){
    process.voterMoins(req,res);
}

}