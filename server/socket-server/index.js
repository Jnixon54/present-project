const socketServer = require('socket.io'); 

module.exports = function(server){
  const io = socketServer(server);
  let userCount = 0;
  io.on('connect', socket => {
    const socketID = socket.id;
    console.log(`CONNECTED: ${socketID} CONNECTED USERS: ${userCount}`);
    userCount += 1;

    socket.on('advance_slide', (data) => {
      console.log('Current Slide: ' + data.currentSlide)
      socket.broadcast.emit('update_client', data);
    });

    socket.on('return_slide', (data) => {
      console.log('Current Slide: ' + data.currentSlide)
      socket.broadcast.emit('update_client', data);
    });

    socket.on('disconnect', (socket) => {
      console.log(`DISCONNECTED: ${socketID} CONNECTED USER: ${userCount}`);
      userCount -= 1;
    });

  })
}

// Houses the server-side socket events