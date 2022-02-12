const http = require('http');
require('dotenv').config()

const server = http.createServer((req, res) => {
    res.end('Voila la réponse du serveur BG !');
});

console.log(process.env.TEST) // remove this after you've confirmed it working

server.listen(process.env.PORT || 3000);