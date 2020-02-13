    //require
const babel = require('babel-register');
const socket = require('socket.io');
const express = require('express');

const app = express();

    //**server setup**
var server = app.listen(3000, () => {

    console.log('un client est connecte');
});

    //**socket setup**
var io = socket(server);

    //**ecoute de la connection cote serveur
io.on('connection', (socket) => {
    console.log('connectid = ', socket.id);
    socket.emit('uid', socket.id);

    //**ecout de la req envoye par le client rr
    socket.on('chat', (data) => {

        io.sockets.emit('chat', data) //envoi a ts le monde ee
        console.log(data);
    });

        //**typing: recu tt
    socket.on('typing', (data) => { 

        socket.broadcast.emit('typing', data); //broadcast = alert all
    });
     
});

    //**stactic files**
    app.use(express.static('public'));