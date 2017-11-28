const initialState = {
    currentSlide: 0
}

// Action type


// Reducer
function reducer(state = initialState, action){
  switch(action.type){
    case 'ADVANCE_SLIDE':
      return {...state, currentSlide: state.currentSlide + 1};
    case 'RETURN_SLIDE':
      return {...state, returnSlide: state.currentSlide - 1};
    default: return state;
  }
}

// Actions
export function advanceSlide(){
  return {
    type: 'ADVANCE_SLIDE'
  }
}

export function returnSlide(){
  return {
    type: 'RETURN_SLIDE'
  }
}

export default reducer;