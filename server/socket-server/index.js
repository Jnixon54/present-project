const socketServer = require('socket.io'); 

module.exports = function(server){
  const io = socketServer(server);
  
  io.on('connect', socket => {
    const socketID = socket.id;
    console.log(socketID + ' CONNECTED');

    socket.on('sendMessage', (payload) => {
      console.log(Object.keys(socket.nsp.sockets));
      console.log(`Message from ${socketID}: ${payload.message}`)
      socket.broadcast.emit('broadcast', payload.message)
    });

    socket.on('disconnect', (socket) => {
      // console.log(`${socketID} disconnected`);
    });

  })
}

// Houses the server-side socket events