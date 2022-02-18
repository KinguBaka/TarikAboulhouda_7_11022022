// Imports
const express = require('express');
const usersCtrl = require('./routes/usersCtrl');
const postsCtrl = require('./routes/postsCtrl');
const commentsCtrl = require('./routes/commentsCtrl');
const validationRule = require('./utils/validation');
const multer = require('./utils/multer-config');

// Routes

exports.router = ( () => {
    const apiRouter = express.Router();

    // Users routes
    apiRouter.route('/signup').post(validationRule.verifLogin, usersCtrl.validateForm ,usersCtrl.signup);
    apiRouter.route('/login').post(usersCtrl.login);
    apiRouter.route('/me').get(usersCtrl.getMyProfile);
    apiRouter.route('/user/:id').get(usersCtrl.getUserProfile);
    apiRouter.route('/me').put(validationRule.verifModif, usersCtrl.validateForm, usersCtrl.modifUserProfil);
    apiRouter.route('/me').delete(usersCtrl.deleteUserProfile);

    // Posts routes
    apiRouter.route('/post/publish').post(multer, validationRule.verifPost, usersCtrl.validateForm , postsCtrl.createPost);
    apiRouter.route('/post/all').get(postsCtrl.listPost);
    apiRouter.route('/user/:id/post').get(postsCtrl.listUserPost);
    apiRouter.route('/post/:id').put(multer, validationRule.verifPost, usersCtrl.validateForm, postsCtrl.modifPost);
    apiRouter.route('/post/:id').delete(postsCtrl.deletePost);
    apiRouter.route('/post/:id/like').put(postsCtrl.likePost);

    // Comments routes
    apiRouter.route('/post/:idPost/comment/publish').post(validationRule.verifComment, usersCtrl.validateForm, commentsCtrl.createComment);
    //apiRouter.route('/comments').get(commentsCtrl.listAllComment);
    apiRouter.route('/post/:idPost/comment').get(commentsCtrl.listComment);
    apiRouter.route('/post/:idPost/comment/:idComment').put(validationRule.verifComment, usersCtrl.validateForm, commentsCtrl.modifComment);
    apiRouter.route('/post/:idPost/comment/:idComment').delete(commentsCtrl.deleteComment);

    /*
    Home :
    
        Signup:
            POST => /signup
    
        Login:
            POST => /login
    
    User :
    
        User info :
            GET ⇒ /me
            PUT ⇒ /me
            DELETE ⇒ /me
    
        User posts :
            GET ⇒ /user/posts
    
    
    Feed :
    
        Posts :
            GET ⇒ /post/all
            POST ⇒ /post/publish
            PUT ⇒ /post/:id
            DELETE ⇒ /post/:id
       
    
        Comments :
            GET ⇒ /post/:id/comments
            POST ⇒ /post/:id/comments/publish
            DELETE ⇒ /post/:id/comments/:id
            PUT ⇒ /post/:id/comments/:id
    
        Likes :
            PUT ⇒ /post/:id/like
    */

    return apiRouter;
})();