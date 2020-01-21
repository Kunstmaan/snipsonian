/*
    Redux action creators, middlewares, reducer utilities, ...
 */
import { STATE_STORAGE_TYPE, REDUCER_STORAGE_TYPE } from './config/storageType';
import createReducer from './reducer/createReducer';
import {
    registerReducer,
    registerStorageTypeForProvidedReducer,
    getRegisteredReducers,
} from './reducer/reducerManager';
import createReduxStore from './store/createReduxStore';

export {
    STATE_STORAGE_TYPE,
    REDUCER_STORAGE_TYPE,
    createReducer,
    registerReducer,
    registerStorageTypeForProvidedReducer,
    getRegisteredReducers,
    createReduxStore,
};
