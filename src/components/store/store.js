import {createStore, applyMiddleware} from 'redux';
import reducer from "./reducer";
import logger from 'redux-logger';
import thunk from 'redux-thunk';

let middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}

const middleware = applyMiddleware(...middlewares);

export const store = createStore(reducer, middleware);