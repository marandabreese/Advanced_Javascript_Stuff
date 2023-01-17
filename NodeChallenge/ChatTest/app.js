const express = require('express');
const app = express();

const server = require('http').createServer(app);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + "/client"));

console.log("You started the server!");

let SOCKET_LIST = {};

const io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log('new user!');
    let socketId = Math.floor(Math.random() * 100);
    SOCKET_LIST[socketId] = socket;
    console.log('Welcome! User ' + socketId);
    socket.on('sendMsgToServer', function(data) {
        console.log('someone sent a message! ' + data);
        for (let i in SOCKET_LIST) {
            //console.log(i + ' ' + SOCKET_LIST[i]);
            SOCKET_LIST[i].emit('addToChat', data);
        }
    });

    socket.on('disconnect', function() {
        delete SOCKET_LIST[socketId];
    })
})

server.listen(4242);