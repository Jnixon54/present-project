const initialState = {
  questionInputValue: '',
  questions: []
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
    case 'UPDATE_QUESTIONS':
      return {...state, questions: [...state.questions, { slideNumber: action.slideNumber, question: action.question }]}
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
export function updateQuestions(data){
  return {
    type: 'UPDATE_QUESTIONS',
    question: data.question,
    slideNumber: data.slideNumber
  }
}
export default reducer;