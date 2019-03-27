//----Import
const mongoose = require('mongoose');
ObjectId = mongoose.Types.ObjectId;
var bcrypt = require('bcrypt');
var jwtutils = require('./jwt.utils');
var models = require('./model');
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;

//----Router
module.exports = {
    
    // s'enregistrer
    register: (req, res) => {

        models.find({ username: req.body.username }).then(user => {
            if (user.length == 0) {
                bcrypt.hash(req.body.password, 5, function (err, bcryptedPassword) {
                    var newUser = new models({
                        email: req.body.email,
                        username: req.body.username,
                        password: bcryptedPassword,
                        role: 1,
                        

                        
                    })
                    if (req.body.email == null || req.body.username == null /*||req.body.password == null*/)  {
                        return res.status(400).json({ 'error': 'missing parameters' });
                      }
                      else if   (req.body.username.length >= 13 || req.body.username.length <= 4) {
                        return res.status(400).json({ 'error': 'wrong username (must be length 5 - 12)' });
                      }
                      else if (!EMAIL_REGEX.test(req.body.email)) {
                        return res.status(400).json({ 'error': 'email is not valid' });
                      }
                      else if (!PASSWORD_REGEX.test(req.body.password)) {
                        return res.status(400).json({ 'error': 'password invalid (must length 4 - 8 and include 1 number at least)' });
                      }
                    else{
                    return newUser.save().then(res.send(newUser));}
                })
            }
            else {
                return res.status(409).json({ 'error': 'déjà existant' });
            }


        })
    },

    //se connecter
    login: (req, res) => {
        models.find({ username: req.body.username }).then(user => {
            // si l'user existe
            if (user.length==1) {
                bcrypt.compare(req.body.password, user[0].password, function (errBycrypt, resBycrypt) {
                   // est que le mdp est correct
                    if (resBycrypt) {
                        return res.status(200).json({
                            'token': jwtutils.generateTokenForUser(user)
                        });
                   // est le mdp est incorrect
                    } else {
                        return res.status(403).json({ 'Erreur': 'Utilisateur ou mot de passe invalide' })
                    }
                    
                })
            // si l'user n'existe pas     
            }else{res.json({ 'Erreur': 'Utilisateur ou mot de passe invalide' })}
        });

    },
    /*test: (req,res,nxt) => {
       console.log(jwtutils.decrypt(req.body));
    }*/
    

}
