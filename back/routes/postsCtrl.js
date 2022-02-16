// Import 
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const fs = require('fs');

// Constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT = 50;

// Routes

module.exports = {

    createPost: (req, res) => {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        
        // Params
        var title = req.body.title;
        var content = req.body.content;
        if (req.file) {
            var attachment = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        }

        /*if (title == null || content == null ) {
            return res.status(400).json({ 'error' : 'Paramétres manquants'});
        }

        if (title.length < TITLE_LIMIT || content.length < CONTENT_LIMIT ) {
            return res.status(400).json({ 'error' : 'Titre ou contenu trop court '});
        }*/

        models.User.findOne({
            where: { id: userId }
        })
        .then(userFound =>{
            if(userFound) {
                models.Post.create({
                    title : title,
                    content : content,
                    attachment,
                    likes : 0,
                    usersLiked : [],
                    UserId : userFound.id
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
            order : [(order !=null) ? order.split(':') : ['title', 'ASC']],
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

    modifPost: (req, res) => {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        // Params
        var title = req.body.title;
        var content = req.body.content;

        /*if (req.body.title) {
            if (title.length < TITLE_LIMIT ) {
                return res.status(400).json({ 'error' : 'Titre trop court '});
            }
        }
        
        if (req.body.content) {
           
            if (content.length < CONTENT_LIMIT ) {
                return res.status(400).json({ 'error' : 'Contenu trop court '});
            }
        }*/

        if (req.file) {
            var attachment = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        }

        /*if (title === null && content === null && attachment === null) {
            return res.status(400).json({ 'error' : 'Paramétres manquants'});
        }*/

        models.User.findOne({
            where: { id: userId }
        })
        .then(userFound =>{
            if(userFound) {
                models.Post.findOne({where : {id : req.params.id }})
                .then(post =>{
                    if (req.attachment) {
                        const filename = post.attachment.split("/images/")[1];
                        fs.unlink(`public/images/${filename}`, () =>
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
                    console.log(modifPost)
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
        var userId = jwtUtils.getUserId(headerAuth);
        var userIsAdmin = jwtUtils.UserIsAdmin(headerAuth);
        console.log(userIsAdmin)
        
        models.Post.findOne({where : {id : req.params.id }})
        .then(post => {
            if (userId === post.UserId || userIsAdmin === true ) {
                if (post.attachment) {
                    const filename = post.attachment.split("/images/")[1];
                    fs.unlink(`public/images/${filename}`, () => {
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
        var userId = jwtUtils.getUserId(headerAuth);
        var likeStatus = req.body.like;
        
        models.User.findOne({
            where: { id: userId }
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
                        usersLiked.push(userId)
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
                        var index = usersLiked.indexOf(userId);
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