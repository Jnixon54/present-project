const socketServer = require('socket.io'); 
const axios = require('axios');

module.exports = function(server){
  const io = socketServer(server);
  let userCount = 0;
  let currentSlideURL = '';
  let slideShowLength = 0;
  io.on('connect', socket => {
    const socketID = socket.id;
    console.log(`CONNECTED: ${socketID} CONNECTED USERS: ${userCount}`);
    userCount += 1;
    console.log('Length', slideShowLength)
    console.log('URL', currentSlideURL)
    socket.emit('update_client', {currentSlideURL: currentSlideURL, slideShowLength: slideShowLength})

    socket.on('advance_slide', (data) => {
      console.log('Current Presentation: ' + data.currentPresentation)
      let slideURL = '';
      const promises = [];
      
      for (let i = 0; i <= 1; i++) {
        promises.push(axios.get(`http://localhost:3001/slide/${data.currentPresentation}/${data.currentSlide + i}`)
        // io.emit('update_client', {...data, currentSlideURL: result.data.url});
        )
      }
      axios.all(promises).then( results => {
        // console.log('RESULT 0', results[0].data)
        currentSlideURL = results[0].data.url;
        
        
        io.emit('update_client', {...data, currentSlideURL: results[0].data.url, nextSlideURL: results[1].data.url, slideShowLength: slideShowLength})
        return
      }).catch(console.log);
      // socket.broadcast.emit('update_client', {...data, currentSlideURL: slideURL});
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
      // let slideURL = '';
      
    
      axios.get(`http://localhost:3001/slide/${data.currentPresentation}/${data.currentSlide}`).then(result => {
        console.log('Update: ' + result.data.slide_number)
        currentSlideURL = result.data.url;
        io.emit('update_client', {...data, currentSlideURL: result.data.url, slideShowLength: slideShowLength});
      }).catch(console.log)
      // socket.broadcast.emit('update_client', data);
    });

    socket.on('update_slides_array', (data) => {
      axios.get(`http://localhost:3001/slides/${data.currentPresentation}`).then( result => {
        // console.log('TESTINGTERETER', result.data);
        slideShowLength = result.data.length;
        io.emit('update_client_presentation_array', result.data)
      }).catch(console.log)
    });

    socket.on('submit_question', (data) => {
      io.emit('update_questions', data)
    })
    socket.on('disconnect', (socket) => {
      console.log(`DISCONNECTED: ${socketID} CONNECTED USER: ${userCount}`);
      userCount -= 1;
    });

  })
}

// Houses the server-side socket events