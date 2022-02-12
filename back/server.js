// Imports

require('dotenv').config()
const express = require('express');


// Instantiate server

const server = express()


// Configure routes 

server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Hello World </h1>')
});

/* server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // allow preflight
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
}); */


// launch server

server.listen(process.env.PORTBACK, function(){
    console.log('Serveur en écoute!');
});