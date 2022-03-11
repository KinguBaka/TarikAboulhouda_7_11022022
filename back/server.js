// Imports
require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express');
const apiRouter = require('./apiRouter').router;


// Instantiate server
const server = express()

// BodyParser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// load static files
server.use(express.static('public'));


// Configure routes
server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // allow preflight
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

server.use('/api/', apiRouter);

// launch server
server.listen(process.env.PORTBACK || process.env.PORT, function(){
    console.log('Serveur en écoute sur le port : ' + process.env.PORTBACK || process.env.PORT);
});