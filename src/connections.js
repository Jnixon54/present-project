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
      socket.emit('advance_slide', {currentSlide: state.presentation.currentSlide + 1})
    }
    if (socket && action.type === 'RETURN_SLIDE') {
      socket.emit('return_slide', {currentSlide: state.presentation.currentSlide - 1})
    }
    return next(action);
  }
}

export default function(store) {
  // const socket = io.connect(`${location.protocol}//${location.hostname}:${PORT}`);
  console.log('DEFAULT SOCKET', socket);

  socket.on('update_client', (data) => {
    store.dispatch(presentationActions.updateClientSlideshow(data));
    console.log('TESTING SOCKETS RECEIVE');
  })

  socket.on('retur_slide', (data) => {
    store.dispatch(presentationActions.returnSlide(data));
  })
}

// houses the socket client events that dispatch actions to the reducer