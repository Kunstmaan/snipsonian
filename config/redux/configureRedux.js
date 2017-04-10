import {createStore, applyMiddleware} from 'redux';
import localStorageMiddleware from './localStorageMiddleware';

import reducers from './reducers';
import {middlewares} from './middlewares';

const store = createStore(
    reducers,
    localStorageMiddleware.getStore(),
    applyMiddleware(...middlewares)
);

export default store;