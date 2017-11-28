import { combineReducers } from 'redux';
import presentationReducer from './presentationReducer';
import userReducer from './userReducer';

export default combineReducers({
  presentation: presentationReducer,
  user: userReducer
})