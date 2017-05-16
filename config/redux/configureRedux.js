import {createStore, applyMiddleware} from 'redux';
import localStorageMiddleware from './localStorageMiddleware';

import reducers from './reducers';
import {middlewares} from './middlewares';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, localStorageMiddleware.getStore(), composeEnhancers(
    applyMiddleware(...middlewares)
));

export default store;