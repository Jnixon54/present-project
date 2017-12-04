/* global location */
/* eslint no-restricted-globals: ["off", "location"] */
import * as presentationActions from './ducks/presentationReducer';
import * as studentActions from './ducks/studentReducer';
import io from 'socket.io-client';
import store from './store'
// import PORT from '../.config';
const PORT = 3001;
var socket = io.connect(`${location.protocol}//${location.hostname}:${PORT}`);
// const state = store.getState();
// OUTBOUND
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
      socket.emit('update_slides_array', { currentPresentation: state.presentation.currentPresentation })
    }
    if (socket && action.type === 'SUBMIT_QUESTION') {
      socket.emit('submit_question', { question: state.student.questionInputValue, slideNumber: state.presentation.currentSlide })
    }
    return next(action);
  }
}
// INBOUND
export default function(store) {
  // const socket = io.connect(`${location.protocol}//${location.hostname}:${PORT}`);
  socket.on('update_client', (data) => {
    store.dispatch(presentationActions.updateClientSlideshow(data));
    // console.log('TESTING SOCKETS RECEIVE', data);
  })
  socket.on('update_client_presentation_array', (data) => {
    store.dispatch(presentationActions.updatePresentationSlides(data));
  })
  socket.on('update_questions', (data) => {
    store.dispatch(studentActions.updateQuestions(data));
  })
}

// houses the socket client events that dispatch actions to the reducer