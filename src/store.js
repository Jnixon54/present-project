import {createStore, applyMiddleware} from 'redux';
import reducers from './ducks/index';
import {socketMiddleware} from './connections';

// const initialState = window.INITIAL_STATE;
const createStoreWithMiddleware = applyMiddleware(socketMiddleware)(createStore);
export default createStoreWithMiddleware(reducers);