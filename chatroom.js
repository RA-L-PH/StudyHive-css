var socketio = io({autoConnect: false});

document.getElementById("join-btn").addEventListener("click", function(){
  let host = documet.getEventById("host").value;

  socket.connect();
  socket.on("connect", function(){
    socket.emit("user_join", host)
})
