import axios from 'axios';
const initialState = {
    currentPresentation: 0,
    currentSlide: 0,
    currentSlideURL: '',
    nextSlideURL: '',
    slideArray: [],
    slidePreviewIsLoading: false
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
      return {...state, currentSlide: action.currentSlide, 
                        currentSlideURL: action.currentSlideURL, 
                        nextSlideURL: action.nextSlideURL}
    case 'RETURN_SLIDE':
      return {...state, currentSlide: state.currentSlide - 1};
    case 'UPDATE_PRESENTATION_ID':
      console.log('REDUCER PRES: ' + action.presentationID)
      return {...state, currentPresentation: action.presentationID}
    case 'GET_PRESENTATION_SLIDES_ARRAY':
        return {...state}
    case `UPDATE_PRESENTATION_SLIDES_ARRAY`:
      return {...state, slideArray: action.slideArray}
    default: 
      return state;
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
    currentSlide: data.currentSlide,
    currentSlideURL: data.currentSlideURL,
    nextSlideURL: data.nextSlideURL
  }
}
export function returnSlide(){
  return {
    type: 'RETURN_SLIDE'
  }
}
export function updatePresentationID(presentationID) {
  return {
    type: 'UPDATE_PRESENTATION_ID',
    presentationID: presentationID
  }
}
export function getCurrentPresentationSlides() {
  console.log('Action for getting slides')
  return {
    type: 'GET_PRESENTATION_SLIDES_ARRAY'
  }
}
export function updatePresentationSlides(presentationSlides) {
  console.log('Action for getting slides')
  return {
    type: 'UPDATE_PRESENTATION_SLIDES_ARRAY',
    slideArray: presentationSlides
  }
}

// export function getCurrentPresentationSlides(presentationID) {
//   console.log('Action for getting slides')
//   return {
//     type: 'UPDATE_PRESENTATION_SLIDES_ARRAY',
//     slideArray: axios.get(`http://localhost:3001/slides/${presentationID}`).then(res => { return res.data})
//   }
// }
export function getSlideArray(slideArray) {
  return {
    type: 'GET_SLIDE_ARRAY',
    slideArray: () => axios.get('slideArray')
  }
}

export default reducer;