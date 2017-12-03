/* global location */
/* eslint no-restricted-globals: ["off", "location"] */
import * as presentationActions from './ducks/presentationReducer';
import io from 'socket.io-client';
import store from './store'
// import PORT from '../.config';
const PORT = 3001;
var socket = io.connect(`${location.protocol}//${location.hostname}:${PORT}`);
// const state = store.getState();

export function socketMiddleware(store) {
  return next => action => {
    const state = store.getState();
    console.log(state)
    if (socket && action.type === 'ADVANCE_SLIDE') {
      socket.emit( 'advance_slide', { currentSlide: state.presentation.currentSlide + 1, 
                                      currentPresentation: state.presentation.currentPresentation })
    }
    if (socket && action.type === 'RETURN_SLIDE') {
      socket.emit('return_slide', { currentSlide: state.presentation.currentSlide - 1, 
                                    currentPresentation: state.presentation.currentPresentation })
    }
    if (socket && action.type === 'GET_PRESENTATION_SLIDES_ARRAY') {
      console.log('CURRRENT PRESSSSY', state.currentPresentation)
      socket.emit('update_slides_array', { currentPresentation: state.presentation.currentPresentation })
    }
    return next(action);
  }
}

export default function(store) {
  // const socket = io.connect(`${location.protocol}//${location.hostname}:${PORT}`);
  console.log('DEFAULT SOCKET', socket);

  socket.on('update_client', (data) => {
    store.dispatch(presentationActions.updateClientSlideshow(data));
    // console.log('TESTING SOCKETS RECEIVE', data);
  })

  socket.on('update_client_presentation_array', (data) => {
    store.dispatch(presentationActions.updatePresentationSlides(data));
  })
}

// houses the socket client events that dispatch actions to the reducer