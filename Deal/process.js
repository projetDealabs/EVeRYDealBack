const mongoose = require('mongoose');
ObjectId = mongoose.Types.ObjectId;
const Deal = require('./model');
const Comment = require('./Comment');
const action = require('./action');
const binary = mongoose.Binary;



module.exports = {
    
    creerUnDeal: (req) => {

        let deal = new Deal({
            name: req.body.name,
            prix: req.body.prix,
            username : req.body.username,
            description: req.body.description,
            lien: req.body.lien,
            dateFin: req.body.dateFin,
            compteur: 0,
            img:req.file.filename,//binary(req.files.uploadedFile.data),
            comments : req.body.comments});

        //if(req.file) deal.picture = req.file.filename;

        return new Promise((resolve,reject)=>{
            
        deal.save(function (err) {
            if (err) {
                reject({erreur : "le deal ne peutt pas être ajouté"});
            } else {
                resolve(  deal );
            }
        })
        })
    },
    
    afficherUnDeal: (id) => {
        return new Promise((resolve,reject)=>{
            Deal.findOne({_id: id},(err, deal)=> {
                if (err) {
                    reject({ erreur : "le deal ne peut pas être ajouté"});
                } else {
                    resolve( deal );
                }    
            });
        })
    },

    ajoutComment :async (req,res)=>{
        const deal = await Deal.findOne({ _id: req.params.id });
          const comment = new Comment({
            contenu : req.body.contenu,
            date : Date(),
            username : req.body.username
        });
          console.log(comment);
          //comment.content = req.body.content;
          console.log(comment.content);
          console.log(comment.djadja);
          comment.deal = deal._id;
          await comment.save();

            deal.comments.push(comment.id); 
             await deal.save(function(){})
             res.send(comment);
            },

            afficherComment: async (req, res) => {
			const deal = await Deal.findOne({ _id: req.params.id }).populate(
			"comments"
            );
        	res.send(deal);
				},

    miseAjourDeal: (req, res) => {
        Deal.findById(req.params.id, function (err, deal) {
            deal.name = req.body.name;
            deal.prix = req.body.prix;
            deal.dateFin = req.body.dateFin;
            deal.description = req.body.description;
            deal.lien = req.body.lien;
            return new Promise((resolve,reject)=>{
            
                deal.save(function (err) {
                    if (err) {
                        reject("le deal ne peut pas être mis à jour");
                    } else {
                        resolve( deal );
                    }
                })
                })
            
        });
    },

    afficherTtLesDeal: (req, res) => {
        Deal.find(function (err, deal) {
            if (err) {
                res.json({ 'erreur': err });
            } else {
                res.json(deal);
            }
        });
    },


    // creerUnDeal: (req, res) => {
    //  let deal = new Deal({
    //      name: req.body.name,
    //      prix: req.body.prix,
    //      description: req.body.description,
    //      lien: req.body.lien,
    //      dateFin: req.body.dateFin,
    //      compteur: 0,
    //  })

    //  //if(req.file) deal.picture = req.file.filename;
    //  deal.save(function (err) {
    //      if (err) {
    //          res.json({ 'KO': err });
    //      } else {
    //          res.json({ 'OK': deal });
    //      }
    //  })
    // },

    

    supprimerDeal: (req, res) => {
        Deal.findById(req.params.id, function (err, deal) {
            if (err) {
                res.json({ 'erreur': err });
            } else {
                deal.remove(function (err) {
                    if (err) {
                        res.json({ 'erreur': err });
                    } else {
                        res.json({ 'supprimé': deal });
                    }
                });
            }
        });
    },

    //voter un deal 


    voterPlus: (req, res) => {
        Deal.findById(req.params.id).populate().then(deal => {
            deal.compteur = deal.compteur + 1;
            deal.save();
            res.send(deal);
            console.log(deal)
        })
    },


    voterMoins: (req, res) => {
        Deal.findById(req.params.id).populate().then(deal => {
            deal.compteur = deal.compteur - 1;
            deal.save();
            res.send(deal);
            console.log(deal)
        })
    },
    afficherDealsUser :  (req, res)=>{
        Deal.find({"username" :req.params.username}).then(deals =>{
                res.send(deals);
            }) ;
     
        },      
    }