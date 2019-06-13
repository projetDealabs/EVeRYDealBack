const process = require('./process');
const Deal = require('./model');

module.exports = {

    creerDeal(req, res) {
        process.creerUnDeal(req)
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    },

    miseAjourDeal(req, res) {
        process.miseAjourDeal(req.params.id, req.body)
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    },

    afficherDeal(req, res) {
        process.afficherUnDeal(req.params.id)
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    },

    afficherLesDeal(req, res) {
        process.afficherTtLesDeal(req, res)
            .then((result) => {
                console.log(result)
                res.status(200).json(result)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    },

    supprimerDeal(req, res) {
        process.supprimerDeal(req.params.id)
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    },



    ajoutComment(req, res) {
        process.ajoutComment(req, res)
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    },


    afficherComment(req, res) {
        process.afficherComment(req, res)
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
    },

    voterPlus(req, res) {
        process.voterPlus(req, res);
    },


    voterMoins(req, res) {
        process.voterMoins(req, res);
    },

    afficherDealsUser(req, res) {
        process.afficherDealsUser(req,res)
    

},
}