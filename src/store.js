import {createStore} from 'redux';
import reducer from './ducks/userReducer';

export default createStore(reducer);