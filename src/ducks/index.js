import { combineReducers } from 'redux';
import presentationReducer from './presentationReducer';
import userReducer from './userReducer';
import studentReducer from './studentReducer';

export default combineReducers({
  presentation: presentationReducer,
  user: userReducer,
  student: studentReducer
})