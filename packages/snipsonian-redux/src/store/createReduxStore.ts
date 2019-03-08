import createStoreEnhancer, { IStoreEnhancerConfig } from './createStoreEnhancer';
import { getRegisteredReducers, IReducers } from '../reducer/reducerManager';
import { STATE_STORAGE_TYPE } from '../config/storageType';

interface IReduxStoreConfig extends Pick<
    IStoreEnhancerConfig,
    'middlewares' | 'stateStorageType' | 'stateStorageKey' | 'customStorage' |
    'shouldCatchStorageErrors' | 'onStorageError'
> {
    redux: any; // TODO better typing?
    reducers?: IReducers;
    enhancers?: any[]; // TODO better enhancer typing?
}

export default function createReduxStore({
    redux,
    reducers = getRegisteredReducers(),
    middlewares = [],
    enhancers = [],
    stateStorageType = STATE_STORAGE_TYPE.NO_STORAGE,
    stateStorageKey,
    customStorage,
    shouldCatchStorageErrors = false,
    onStorageError,
}: IReduxStoreConfig) {
    const storeEnhancer = createStoreEnhancer({
        middlewares,
        stateStorageType,
        stateStorageKey,
        customStorage,
        shouldCatchStorageErrors,
        onStorageError,
    });

    const composeEnhancers = (typeof window !== 'undefined' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'])
        || redux.compose;

    const store = redux.createStore(
        redux.combineReducers(reducers),
        storeEnhancer.preloadedState,
        composeEnhancers(...enhancers, redux.applyMiddleware(...storeEnhancer.middlewares)),
    );

    return store;
}
