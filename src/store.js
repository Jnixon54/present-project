import {createStore, applyMiddleware} from 'redux';
import reducers from './ducks/index';
import {socketMiddleware} from './connections';
import promiseMiddleware from 'redux-promise-middleware';

// const initialState = window.INITIAL_STATE;
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware(), socketMiddleware)(createStore);
export default createStoreWithMiddleware(reducers);