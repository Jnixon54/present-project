const initialState = {
    currentSlide: 0,
    currentSlideURL: ''
}

// Action type


// Reducer
function reducer(state = initialState, action){
  switch(action.type){
    case 'ADVANCE_SLIDE':
    console.log('REDUCER: ADVANCE_SLIDE');
      return {...state, currentSlide: state.currentSlide + 1};
    case 'ADVANCE_CLIENT_SLIDE':
      console.log('REDUCER: ADVANCE_CLIENT_SLIDE')
      return {...state, currentSlide: state.currentSlide + 1}
    case 'UPDATE_CLIENT':
      return {...state, currentSlide: action.currentSlide}
    case 'RETURN_SLIDE':
      return {...state, currentSlide: state.currentSlide - 1};
    default: return state;
  }
}

// Actions
export function advanceSlide(){
  return {
    type: 'ADVANCE_SLIDE'
  }
}
export function advanceClientSlide(){
  return {
    type: 'ADVANCE_CLIENT_SLIDE'
  }
}
export function updateClientSlideshow(data){
  console.log('DATA', data)
  return {
    type: 'UPDATE_CLIENT',
    currentSlide: data.currentSlide
  }
}
export function returnSlide(){
  return {
    type: 'RETURN_SLIDE'
  }
}

export default reducer;