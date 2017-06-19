/* global window */

import createStoreEnhancer from './createStoreEnhancer';
import {getRegisteredReducers} from './reducerManager';

import STORE_STORAGE_TYPE from './storeStorageType';

function createReduxStore({
    redux,
    reducers = getRegisteredReducers(),
    middlewares = [],
    storeStorageType = STORE_STORAGE_TYPE.NO_STORAGE,
    storeStorageKey
}) {
    const storeEnhancer = createStoreEnhancer({
        middlewares,
        storeStorageType,
        storeStorageKey
    });

    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
        || redux.compose;
    /* eslint-enable */

    const store = redux.createStore(
        redux.combineReducers(reducers),
        storeEnhancer.preloadedState,
        composeEnhancers(redux.applyMiddleware(...storeEnhancer.middlewares))
    );

    return store;
}

export default createReduxStore;