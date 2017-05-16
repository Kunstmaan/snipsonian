/* global compose */
import {createStore, applyMiddleware} from 'redux';
import localStorageMiddleware from './localStorageMiddleware';

import reducers from './reducers';
import {middlewares} from './middlewares';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(
    reducers,
    localStorageMiddleware.getStore(),
    composeEnhancers(applyMiddleware(...middlewares))
);

export default store;