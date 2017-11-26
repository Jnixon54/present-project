const initialState = {
  userID: '',
  isLoggedIn: false,
  socketID: ''
}

// Action type
// const SET_USER_ID = 'SET_USER_ID';

// Reducer
function reducer(state = initialState, action){
  switch(action.type){
    case 'SET_USER_ID':
      return {...state, userID: action.userID}
    case 'SET_SOCKET_ID':
      return {...state, socketID: action.socketID}
    default: return state;
  }
}

// Actions
export function setUserID(userID){
  return {
    type: 'SET_USER_ID',
    userID
  }
}

export function setSocketID(socketID){
  return {
    type: 'SET_SOCKET_ID',
    socketID
  }
}

export default reducer;