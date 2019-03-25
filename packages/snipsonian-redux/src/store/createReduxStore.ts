import {
    createStore,
    compose,
    combineReducers,
    applyMiddleware,
    StoreEnhancer,
    Store,
} from 'redux';
import createStoreEnhancer, { IStoreEnhancerConfig } from './createStoreEnhancer';
import { getRegisteredReducers, IReducers } from '../reducer/reducerManager';
import { STATE_STORAGE_TYPE } from '../config/storageType';

interface IReduxStoreConfig extends Pick<
    IStoreEnhancerConfig,
    'middlewares' | 'stateStorageType' | 'stateStorageKey' | 'customStorage' |
    'shouldCatchStorageErrors' | 'onStorageError'
> {
    reducers?: IReducers;
    enhancers?: StoreEnhancer[];
}

export default function createReduxStore({
    reducers = getRegisteredReducers(),
    middlewares = [],
    enhancers = [],
    stateStorageType = STATE_STORAGE_TYPE.NO_STORAGE,
    stateStorageKey,
    customStorage,
    shouldCatchStorageErrors = false,
    onStorageError,
}: IReduxStoreConfig): Store {
    const storeEnhancer = createStoreEnhancer({
        middlewares,
        stateStorageType,
        stateStorageKey,
        customStorage,
        shouldCatchStorageErrors,
        onStorageError,
    });

    const composeEnhancers = (typeof window !== 'undefined' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'])
        || compose;

    const store = createStore(
        combineReducers(reducers),
        storeEnhancer.preloadedState,
        composeEnhancers(...enhancers, applyMiddleware(...storeEnhancer.middlewares)),
    );

    return store;
}
