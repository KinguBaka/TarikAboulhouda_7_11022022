// Imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const { validationResult, matchedData } = require('express-validator');

// Routes
module.exports = {

    validateForm:function(req,res, next){
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            var errMsg= errors.mapped();
            var inputData = matchedData(req);  
            return res.status(409).json({errors:errMsg, inputData:inputData});
        } else {
            next();
        }
    },

    signup: (req, res) => {
        // Params
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var bio = req.body.bio;

        /*if (email == null || username == null || password == null) {
            return res.status(400).json({ 'error': 'Paramétre(s) manquant(s) '});
        }
        // Verify pseudo length, mail regex, password etc.
        if (username.length >= 13 || username.length <= 4) {
            return res.status(400).json({ 'error': 'Mauvais username renseigné (doit faire entre 4 - 13 caractéres) '});
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ 'error': 'Email renseigné incorrect'});
        }
        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({ 'error': 'Mot de passe invalide : Le mot de passe doit comporter entre 4 et 8 lettres et inclure au moins un chiffre numérique. '});
        }*/

        models.User.findOne({
            attributes: ['email'],
            where: { email : email }
        })
        .then(userFound => {
            if (!userFound) {
                bcrypt.hash(password, 5, function(err, bcryptedPassword){
                    var newUser = models.User.create({
                        email: email,
                        username: username,
                        password: bcryptedPassword,
                        bio: bio,
                        isAdmin: 0
                    })
                    .then(newUser => {
                        return res.status(201).json({ 'userId' : newUser.id })
                    })
                    .catch(err => res.status(500).json({ 'error': "Impossible d'ajouter l'utilisateur: " + err}));
                });
            } else {
                return res.status(409).json({ 'error' : "L'utilisateur existe déja"})
            }
        })
        .catch(err => {
            return res.status(409).json({ 'error' : "Impossible de vérifier l'utilisateur: " + err})
        });
    },

    login: (req, res) => {
        // TODO
    }



};