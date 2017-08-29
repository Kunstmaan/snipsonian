/* global window */

import createStoreEnhancer from './createStoreEnhancer';
import {getRegisteredReducers} from './reducerManager';

import {STATE_STORAGE_TYPE} from './storageType';

function createReduxStore({
    redux,
    reducers = getRegisteredReducers(),
    middlewares = [],
    stateStorageType = STATE_STORAGE_TYPE.NO_STORAGE,
    stateStorageKey,
    customStorageMap = {},
    shouldCatchStorageErrors = false,
    onStorageError = () => {}
}) {
    const storeEnhancer = createStoreEnhancer({
        middlewares,
        stateStorageType,
        stateStorageKey,
        customStorageMap,
        shouldCatchStorageErrors,
        onStorageError
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