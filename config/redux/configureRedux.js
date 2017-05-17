import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import storeEnhancer from './storeEnhancer';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
/* eslint-enable */

const store = createStore(
    reducers,
    storeEnhancer.preloadedState,
    composeEnhancers(applyMiddleware(...storeEnhancer.middlewares))
);

export default store;
