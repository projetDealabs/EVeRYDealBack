//----Import
var bcrypt = require('bcrypt');
var jwtutils = require('../utils/jwt.utils');
var models = require('../User/model');

//----Router
module.exports = {
    
    // s'enregistrer
    register: (req, res, body) => {
        models.find({ username: req.body.username }).then(user => {
            if (user.length == 0) {
                bcrypt.hash(req.body.password, 5, function (err, bcryptedPassword) {
                    var newUser = new models({
                        email: req.body.email,
                        username: req.body.username,
                        password: bcryptedPassword,
                        role: 1,
                    })
                    return newUser.save().then(res.send(newUser));
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
    test: (req,res,nxt) => {
       console.log(jwtutils.decrypt(req.body));
    }
    

}
