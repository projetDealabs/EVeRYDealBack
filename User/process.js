//----Import
const mongoose = require('mongoose');
ObjectId = mongoose.Types.ObjectId;
const bcrypt = require('bcrypt');
const jwtutils = require('./jwt.utils');
const models = require('./model');
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

//----Router
module.exports = {

    // s'enregistrer
    register: (req, res) => {

        models.find({ username: req.body.username }).then(user => {
            if (user.length == 0) {
                bcrypt.hash(req.body.password, 5, function (err, bcryptedPassword) {
                    let newUser = new models({
                        email: req.body.email,
                        username: req.body.username,
                        password: bcryptedPassword,
                        role: 1,



                    })
                    if (req.body.email == null || req.body.username == null || req.body.password == null) {
                        return res.status(400).json({ 'Erreur': 'Paramètre manquant' });
                    }
                    else if (req.body.username.length >= 13 || req.body.username.length <= 4) {
                        return res.status(400).json({ 'Erreur': 'Nombre de caractère pour l\'\ utilisateur doit etre compris en 5 et 13' });
                    }
                    else if (!EMAIL_REGEX.test(req.body.email)) {
                        return res.status(400).json({ 'Erreur': 'Email invalide' });
                    }
                    else if (!PASSWORD_REGEX.test(req.body.password)) {
                        return res.status(400).json({ 'Erreur': 'Mot de passe invalide ! taille doit etre entre 4 et 8 et contenir au moins 1 chiffre' });
                    }
                    else {
                        return newUser.save().then(res.send(newUser));
                    }
                })
            }
            else {
                return res.status(409).json({ 'Erreur': 'Utilisateur déjà existant' });
            }


        })
    },

    //se connecter
    login: (req, res) => {
        models.find({ username: req.body.username }).then(user => {
            // si l'user existe
            if (user.length == 1) {
                bcrypt.compare(req.body.password, user[0].password, function (errBycrypt, resBycrypt) {
                    // est que le mdp est correct
                    if (resBycrypt) {
                        return res.status(200).json({
                            'token': jwtutils.generateTokenForUser(user[0])
                        });
                        // est le mdp est incorrect
                    } else {
                        return res.status(403).json({ 'Erreur': 'Utilisateur ou mot de passe invalide' })
                    }

                })
                // si l'user n'existe pas     
            } else { res.json({ 'Erreur': 'Utilisateur ou mot de passe invalide' }) }
        });

    },
    getuserprofile: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let userId = jwtutils.getUserId(headerAuth);
        if (userId < 0) {
            return res.status(400).json({ 'Erreur': 'mauvais token' });
        }
        else {
            res.json(userId);
        }
    }


}
