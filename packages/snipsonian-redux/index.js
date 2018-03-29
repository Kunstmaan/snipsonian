import createReducer from './src/reducer/createReducer';
import createReduxStore from './src/store/createReduxStore';
import { registerReducer } from './src/reducer/reducerManager';
import { STATE_STORAGE_TYPE, REDUCER_STORAGE_TYPE } from './src/config/storageType';

export {
    createReducer,
    createReduxStore,
    registerReducer,
    STATE_STORAGE_TYPE,
    REDUCER_STORAGE_TYPE,
};
