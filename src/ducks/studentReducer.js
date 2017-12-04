const initialState = {
  questionInputValue: ''
}

// Action type
// const SET_USER_ID = 'SET_USER_ID';

// Reducer
function reducer(state = initialState, action){
  switch(action.type){
    case 'UPDATE_INPUT':
      return {...state, questionInputValue: action.input}
    case 'SUBMIT_QUESTION':
      return {...state, questionInputValue: ''}
    default: 
      return state;
  }
}

// Actions
export function updateInput(input){
  return {
    type: 'UPDATE_INPUT',
    input
  }
}

export function submitQuestion(){
  return {
    type: 'SUBMIT_QUESTION'
  }
}

export default reducer;