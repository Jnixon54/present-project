const socketServer = require('socket.io'); 
const axios = require('axios');

module.exports = function(server){
  const io = socketServer(server);
  let userCount = 0;
  io.on('connect', socket => {
    const socketID = socket.id;
    console.log(`CONNECTED: ${socketID} CONNECTED USERS: ${userCount}`);
    userCount += 1;

    socket.on('advance_slide', (data) => {
      console.log('Current Presentation: ' + data.currentPresentation)
      let slideURL = '';
      const promises = [];

      for (let i = 0; i <= 1; i++) {
        promises.push(axios.get(`http://localhost:3001/slide/${data.currentPresentation}/${data.currentSlide + i}`)
        // io.emit('update_client', {...data, currentSlideURL: result.data.url});
        )
      }
      axios.all(promises).then( results =>
        // console.log('RESULT 0', results[0].data)
        io.emit('update_client', {...data, currentSlideURL: results[0].data.url, nextSlideURL: results[1].data.url})
      ).catch(console.log);
      // socket.broadcast.emit('update_client', {...data, currentSlideURL: slideURL});
    });

    socket.on('update_slides_array', (data) => {
      axios.get(`http://localhost:3001/slides/${data.currentPresentation}`).then( result => {
        console.log('TESTINGTERETER', result.data);
        io.emit('update_client_presentation_array', result.data)
      }).catch(console.log)
    });

    // socket.on('advance_slide', (data) => {
    //   console.log('Current Presentation: ' + data.currentPresentation)
    //   let slideURL = '';
    //   axios.get(`http://localhost:3001/slide/${data.currentPresentation}/${data.currentSlide}`).then(result => {
    //     console.log('Update: ' + result.data.slide_number)
    //     io.emit('update_client', {...data, currentSlideURL: result.data.url});
    //   }).catch(console.log)
    //   // socket.broadcast.emit('update_client', {...data, currentSlideURL: slideURL});
    // });

    socket.on('return_slide', (data) => {
      console.log('Current Slide: ' + data.currentSlide)
      let slideURL = '';
      axios.get(`http://localhost:3001/slide/${data.currentPresentation}/${data.currentSlide}`).then(result => {
        console.log('Update: ' + result.data.slide_number)
        io.emit('update_client', {...data, currentSlideURL: result.data.url});
      }).catch(console.log)
      // socket.broadcast.emit('update_client', data);
    });

    socket.on('disconnect', (socket) => {
      console.log(`DISCONNECTED: ${socketID} CONNECTED USER: ${userCount}`);
      userCount -= 1;
    });

  })
}

// Houses the server-side socket events