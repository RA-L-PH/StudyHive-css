const socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('new_message', (data) => {
        const messagesList = document.getElementById('messages');
        const newMessage = document.createElement('li');
        newMessage.innerHTML = `<strong>${data.author}:</strong> ${data.message} <small>${data.timestamp}</small>`;
        messagesList.appendChild(newMessage);
    });

    function sendMessage() {
        const messageInput = document.getElementById('message');
        const roomName = document.getElementById('room-name').value;
        if (messageInput.value && roomName) {
            socket.emit('send_message', {room_name: roomName, message: messageInput.value});
            messageInput.value = '';
        }
    }
