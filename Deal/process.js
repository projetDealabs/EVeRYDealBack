const mongoose = require('mongoose');
ObjectId = mongoose.Types.ObjectId;
const Deal = require('./model');
const Comment = require('./Comment');
const action = require('./action');

module.exports = {

    creerUnDeal: (req) => {

        let deal = new Deal({
            name: req.body.name,
            prix: req.body.prix,
            username: req.body.username,
            description: req.body.description,
            lien: req.body.lien,
            dateFin: req.body.dateFin,
            compteur: 0,
            picture : req.files,
            //  img: req.file.filename,
            comments: req.body.comments
        });

        return new Promise((resolve, reject) => {
            deal.save(function (err) {
                if (err) {
                    reject({ erreur: "Le deal ne peut pas être ajouté" });
                } else {
                    resolve(deal);
                }
            })
        })
    },

    miseAjourDeal: (id, maj) => {
        return Deal.updateOne({ _id: new ObjectId(id) }, { $set: maj });
    },


    afficherUnDeal: (id) => {
        return new Promise((resolve, reject) => {
            Deal.findOne({ _id: id }, (err, deal) => {
                if (err) {
                    reject({ erreur: "Le deal n'existe pas" });
                } else {
                    resolve(deal);
                }
            });
        })
    },
    afficherTtLesDeal: () => {
        return new Promise((resolve, reject) => {
            Deal.find((err, deal) => {
                if (err) {
                    reject({ erreur: "aucun deal" })
                } else {
                    resolve({ deal })
                }
            })
        })
    },

    supprimerDeal: (id) => {
        return new Promise((resolve, reject) => {
            Deal.findById({ _id: id }, function (err, deal) {

                deal.remove(function (err) {
                    if (err) {
                        reject("le deal ne peut pas être supprimé");
                    } else {
                        resolve(deal);
                    }
                })
            })
        })
    },

    ajoutComment: async (req, res) => {
        const deal = await Deal.findOne({ _id: req.params.id });
        const comment = new Comment({
            contenu: req.body.contenu,
            date: Date(),
            username: req.body.username
        });
        comment.deal = deal._id;
        await comment.save();
        deal.comments.push(comment.id);
        await deal.save(function () { })
        res.send(comment);
    },

    afficherComment: async (req, res) => {
        const deal = await Deal.findOne({ _id: req.params.id }).populate(
            "comments"
        );
        res.send(deal);
    },



    // miseAjourDeal: (id) => {
    //     return new Promise((resolve, reject) => {
    //     Deal.findById({_id : id}, function (err, deal) {
    //         console.log(deal);
    //         deal.updateOne

    //             // deal.updateOne(function (err) {
    //             //     if (err) {
    //             //         reject("le deal ne peut pas être mis à jour");
    //             //     } else {
    //             //         resolve(deal);
    //             //     }
    //             // })
    //         })
    //     })},



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
    afficherDealsUser: (req, res) => {
        Deal.find({ "username": req.params.username }).then(deals => {
            res.send(deals);
        });

    },
//     afficherDealsUser: (req) => {
//         return new Promise((resolve, reject) => {
        
//         Deal.find({ "username": req.params.username },(err,deal)=>{
//             if(err){
//                 reject({ erreur: "Le deal n'existe pas" });
//             }else{
//                 resolve(deal)
//             }

//     })
// })}
}