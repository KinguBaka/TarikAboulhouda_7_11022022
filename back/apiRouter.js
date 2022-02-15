// Imports
const express = require('express');
const usersCtrl = require('./routes/usersCtrl');
const postsCtrl = require('./routes/postsCtrl');
const commentsCtrl = require('./routes/commentsCtrl');

// Routes

exports.router( () => {
    const apiRouter = express.Router();

    // Routes
    /* 
    Home :
    
        Signup:
            POST => /signup
    
        Login:
            POST => /login
    
    User :
    
        User info :
            GET ⇒ /me | ⇒/user
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
});