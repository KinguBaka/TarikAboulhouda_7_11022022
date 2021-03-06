// Imports
const bcrypt = require('bcrypt');
const models = require('../models');
const { validationResult, matchedData } = require('express-validator');
const jwtUtils = require('../utils/jwt.utils');

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
        // Params
        var email = req.body.email;
        var password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({ 'error': 'Paramétre(s) manquant(s)' });
        }

        models.User.findOne({
            where : {email: email }
        })
        .then(userFound => {
            if (userFound) {
                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                    if (resBycrypt) {
                        return res.status(200).json({
                            'userId': userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    }else {
                        return res.status(403).json({ 'error' : 'Mot de passe incorrect' });
                    }
                })
            } else {
                return res.status(404).json({ 'error' : 'Utilisateur introuvable' });
            }
        })
        .catch(err => {
            return res.status(500).json({'error' : "Impossible de vérifier l'utilisateur"})
        });
    },

    getMyProfile: (req, res) => {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0) {
            return res.status(400).json({ 'error': 'Mauvais token' });
        }
        models.User.findOne({
            attributes: ['id', 'email', 'username', 'bio', 'isAdmin'],
            where: { id: userId }
        }).then(user => {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json({ 'error' : 'Utilisateur introuvable'})
            }
        }).catch(err => {
            res.status(500).json({ 'error' : "impossible de récupérer l'utilisateur: " + err})
        })
    },

    getUserProfile: (req, res) => {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var myId = jwtUtils.getUserId(headerAuth);

        if (myId < 0) {
            return res.status(400).json({ 'error': 'Mauvais token' });
        }
        models.User.findOne({
            attributes: ['bio','username', 'id'],
            where:{id : req.params.id}
        }).then(user => {
            if (user) {
            res.status(201).json(user);
            } else {
                res.status(404).json({ 'error' : 'Utilisateur introuvable'})
            }
        }).catch(err => {
            res.status(500).json({ 'error' : "impossible de récupérer l'utilisateur: " + err})
        })
    },

    deleteUserProfile : (req, res) =>{
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0) {
            return res.status(400).json({ 'error': 'Mauvais token' });
        }

        models.User.findOne({
            attributes: ['id'],
            where: { id: userId }
        }).then(userFound => {
            if (userFound) {
                userFound.destroy();
                res.status(200).json({ message : " Utilisateur supprimé !"})
            } else {
                res.status(404).json({ 'error' : 'Utilisateur introuvable'})
            }
        }).catch(err => res.status(400).json({ 'error' : " Impossible de supprimer l'utilisateur "+ err }));
    },

    modifUserProfil : (req, res) => {
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        // Params
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var bio = req.body.bio;

        var value = {email : email, username : username, password : password, bio : bio }

        models.User.findOne({
            where: { id: userId }
        })
        .then(userFound => {
            if(userFound) {
                bcrypt.hash(password, 5, function(err, bcryptedPassword){
                    value.password = bcryptedPassword;
                    models.User.update(
                        value,
                        {where : {id : userFound.id}}
                    )
                    .then(userModif => {
                        if (userModif == 1) {
                            return res.status(201).json({'message' : 'Utilisateur modifié '});
                        } else {
                            return res.status(500).json({'error' : "Impossible de modifier l'utilisateur"});
                        }
                    })
                })
            } else {
                res.status(404).json({ 'error' : 'Utilisateur introuvable'});
            }
        })
        .catch(err => {
            return res.status(409).json({ 'error' : "Impossible de vérifier l'utilisateur: " + err})
        });
    }
};