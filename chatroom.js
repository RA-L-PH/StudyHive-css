        const socket = io.connect('/');
        const username = $('#username');
        const room = $('#room');
        const messages = $('#messages');
        const message = $('#message');

        $(document).ready(() => {
            socket.on('connect', () => {
                console.log('Connected');
            });

            socket.on('message', data => {
                console.log(data);
                messages.append(`<li>${data}</li>`);
            });

            $('#join').click(() => {
                socket.emit('join', {
                    username: username.val(),
                    room: room.val(),
                });
            });

            $('#leave').click(() => {
                socket.emit('leave', {
                    username: username.val(),
                    room: room.val(),
                });
            });

            $('#send-message').click(() => {
                socket.emit('message', {
                    username: username.val(),
                    room: room.val(),
                    message: message.val(),
                });
            });
        });
