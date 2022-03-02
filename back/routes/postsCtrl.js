// Import 
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const fs = require('fs');

// Constants
const ITEMS_LIMIT = 50;

// Routes

module.exports = {

    createPost: (req, res) => {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var idCurrentUser = jwtUtils.getUserId(headerAuth);
        
        // Params
        var title = req.body.title;
        var content = req.body.content;
        if (req.file) {
            var attachment = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        }

        models.User.findOne({
            where: { id: idCurrentUser }
        })
        .then(userFound =>{
            if(userFound) {
                models.Post.create({ 
                    UserId : userFound.id,
                    title : title,
                    content : content,
                    attachment,
                    likes : 0,
                    usersLiked : []
                })
                .then(newPost => {
                    if (newPost) {
                        return res.status(201).json(newPost);
                    } else {
                        return res.status(500).json({'error' : 'Impossible de poster un message'});
                    }
                });
            } else {
                res.status(404).json({ 'error' : 'Utilisateur introuvable'});
            }
        })
        .catch(err => {
            return res.status(409).json({ 'error' : "Impossible de vérifier l'utilisateur: " + err})
        });

    },

    listPost: (req, res) => {
        // Params 
        var fields = req.query.fields;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order;

        if (limit > ITEMS_LIMIT) {
            limit = ITEMS_LIMIT;
        }

        models.Post.findAll({
            order : [(order !=null) ? order.split(':') : ['createdAt', 'DESC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit: null,
            offset: (!isNaN(offset)) ? offset : null,
            include : [{
                model: models.User,
                attributes: [ 'username' ]
            }]
        })
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({'error' : 'Messages introuvables'});
            }
        })
        .catch(err =>{
            res.status(500).json({ 'error' : 'Champs invalides ' + err});
        })
    },

    listUserPost: (req, res) => {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var idCurrentUser = jwtUtils.getUserId(headerAuth);

        var fields = req.query.fields;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order;

        if (limit > ITEMS_LIMIT) {
            limit = ITEMS_LIMIT;
        }

        models.User.findOne({
            where: { id: idCurrentUser }
        })
        .then(userFound =>{
            if(userFound) {
                models.Post.findAll({
                    where: {userId : req.params.id },
                    order : [(order !=null) ? order.split(':') : ['createdAt', 'DESC']],
                    attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
                    limit: (!isNaN(limit)) ? limit: null,
                    offset: (!isNaN(offset)) ? offset : null,
                    include : [{
                        model: models.User,
                        attributes: [ 'username' ]
                    }]
                })
                .then(post => {
                    if (post) {
                        res.status(200).json(post);
                    } else {
                        res.status(404).json({'error' : 'Messages introuvables'});
                    }
                })
            } else {
                res.status(404).json({ 'error' : 'Utilisateur introuvable'});
            }
        })
        .catch(err => {
            return res.status(409).json({ 'error' : "Impossible de vérifier l'utilisateur: " + err})
        });
    },

    modifPost: (req, res) => {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var idCurrentUser = jwtUtils.getUserId(headerAuth);

        // Params
        if (req.body.title | req.body.title !== "") {
            var title = req.body.title;
        }

        if (req.body.content | req.body.content !== "") {
            var content = req.body.content;
        }
        
        if (req.file) {
            var attachment = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        }

        models.User.findOne({
            where: { id: idCurrentUser }
        })
        .then(userFound =>{
            if(userFound) {
                models.Post.findOne({where : {id : req.params.id }})
                .then(post =>{
                    if (post.attachment !== null) {
                        const filename = post.attachment.split("/images/")[1];
                        fs.unlink(`./public/images/${filename}`, () =>
                            console.log("Image supprimée")
                        )
                    }
                })
                models.Post.update({
                    title:title,
                    content: content,
                    attachment: attachment
                    },
                    {where : {id: req.params.id , userId: userFound.id}}
                )
                .then(modifPost => {
                    if (modifPost == 1) {
                        return res.status(201).json({'message' : 'Message modifié '});
                    } else {
                        return res.status(500).json({'error' : 'Impossible de modifier le message'});
                    }
                })
            } else {
                res.status(404).json({ 'error' : 'Utilisateur introuvable'});
            }
        })
        .catch(err => {
            return res.status(409).json({ 'error' : "Impossible de vérifier l'utilisateur: " + err})
        });
    },

    deletePost: (req, res) => {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var idCurrentUser = jwtUtils.getUserId(headerAuth);
        var userIsAdmin = jwtUtils.UserIsAdmin(headerAuth);
        
        models.Post.findOne({where : {id : req.params.id }})
        .then(post => {
            if (idCurrentUser === post.userId || userIsAdmin === true ) {
                if (post.attachment) {
                    const filename = post.attachment.split("/images/")[1];
                    fs.unlink(`./public/images/${filename}`, () => {
                        post.destroy()
                        res.status(200).json({ message : " Message supprimé et attachment supprimé !"}); 
                    })
                } else {
                    post.destroy()
                    res.status(200).json({ message : " Message supprimé !"});
                }
            } else {
                res.status(404).json({ 'error' : 'Utilisateur non autorisé'});
            }
        })
        .catch(err => { 
            return res.status(409).json({ 'error' : "Message introuvable : " + err})
        });
    },

    likePost: (req, res) => {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var idCurrentUser = jwtUtils.getUserId(headerAuth);
        var likeStatus = req.body.like;
        
        models.User.findOne({
            where: { id: idCurrentUser }
        })   
        .then(userFound =>{
            if (userFound) {
                models.Post.findOne({ where : {id : req.params.id }})
                .then(post => {
                    if (likeStatus == 1) {
                        var likes = post.likes + 1;
                        if (post.usersLiked ) {
                            var usersLiked = Array.from(post.usersLiked);
                        } else {
                            var usersLiked = [];
                        }
                        usersLiked.push(idCurrentUser)
                        var value = { likes: likes, usersLiked: usersLiked};
                        models.Post.update(
                            value,
                            { where : { id: req.params.id }}
                        )
                        .then(() => res.status(200).json( { message: "Vous avez like ce message !" }))
                        .catch(err => res.status(400).json({ 'error' : "Vous n'avez pas pu liker ce message : " + err }));
                    }
                    if (likeStatus == 0) {
                        var likes = post.likes - 1;
                        var usersLiked = Object.values(post.usersLiked);
                        var index = usersLiked.indexOf(idCurrentUser);
                        usersLiked.splice(index, 1);
                        var value = { likes: likes, usersLiked: usersLiked };
                        models.Post.update(
                            value,
                            { where : { id: req.params.id }}
                        )
                        .then(() => res.status(200).json({ message: "Like annulé !" }))
                        .catch((err) => res.status(400).json({ 'error' : "Vous n'avez pas pu annuler votre like : "+ err }))
                    }
                })
            } else {
                res.status(404).json({ 'error' : 'Utilisateur introuvable'});
            }
        })
        .catch(err => {
            return res.status(409).json({ 'error' : "Impossible de vérifier l'utilisateur : " + err})
        });
    }
};