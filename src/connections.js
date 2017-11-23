/* global location */
/* eslint no-restricted-globals: ["off", "location"] */
import io from 'socket.io-client';
// import PORT from '../.config';
const PORT = 3001;

export default function(store) {
  const socket = io.connect(`${location.protocol}//${location.hostname}:${PORT}`);

  console.log(socket)
}

// houses the socket client 
// events that dispatch actions to the reducer2