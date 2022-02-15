onload = function() {
    var socket = io('http://localhost:3000');

    var player;

    function renderRoom(data) {
        $('#messages').append('<div id="message"><strong>' + data.autor + '</strong> entrou na sala!</div>');
    }

    function render(message) {
        $('#messages').append('<div id="message"><strong>' + message.autor + '</strong>: ' + message.mensagem + '</div>');
    }

    socket.on('entrou', function(data) {
        renderRoom(data);
    });

    socket.on('recebido', function(message) {
        render(message)
    });

    $('#room').submit(function(event) {
        event.preventDefault()

        var room = $('input[name=room]').val();
        var user = $('input[name=name]').val();

        player = {
            roomUser: room,
            autor: user,
        };

        renderRoom(player)
        socket.emit('entrar', player)
    })

    $('#chat').submit(function(event) {
        event.preventDefault();
        var room = player.roomUser;
        var user = player.autor;
        var msg = $('input[name=msg]').val();

        var msgObject = {
            roomUser: room,
            autor: user,
            mensagem: msg,
        };
        render(msgObject);
        socket.emit('sendMessage', msgObject)
    });

    $('#voto').submit(function(event) {
        event.preventDefault();
        var room = player.roomUser;
        var user = player.autor;
        var msg = valor

        var msgObject = {
            roomUser: room,
            autor: user,
            mensagem: msg,
        };
        render(msgObject);
        socket.emit('sendMessage', msgObject)
    });
}