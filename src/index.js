const http = require('http');
const path = require('path');

const express = require('express');
const socketio = require('socket.io');

const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

//de connection
mongoose.connect('mongodb://localhost/chat-database')
    .then(db => console.log('db is connected'))
    .catch(err => console.log(err));


//settings
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);

//console.log(__dirname, 'public')

// archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));
//empieza el servidor
server.listen(app.get('port'),() => {
    console.log('servidor en puerto: ', app.get('port'));
});