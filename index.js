const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/rooms', (req, res, next) => {
    res.render('index.html');

});

let messages = [];

io.on('connection', socket => {
    console.log('socket conectado ' + socket.id);

    socket.on('sendMessage', data => {
        messages.push(data);
        socket.to(data.roomUser).emit('recebido', data);
    });

    socket.on('entrar', data => {
        socket.join(data.roomUser)
        socket.to(data.roomUser).emit('entrou', data)
        console.log(data.autor + ' entrou na sala ' + data.roomUser)
    })

    socket.on('votou', data => {
        
    })
});

server.listen(3000);