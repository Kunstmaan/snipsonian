import { REDUCER_STORAGE_TYPE } from '../config/storageType';
import { TReducer } from './createReducer';
import {
    registerStorageTypeForProvidedReducer,
    getRegisteredReducers,
    IProvidedReducerConfig,
} from './reducerManager';

export default function registerProvidedReducer<ReducerState>(
    reducer: TReducer<ReducerState>,
    {
        key,
        reducerStorageType = REDUCER_STORAGE_TYPE.INHERIT,
        transformReducerStateForStorage = (reducerState) => reducerState,
    }: IProvidedReducerConfig<ReducerState>,
): void {
    registerStorageTypeForProvidedReducer({
        key,
        reducerStorageType,
        transformReducerStateForStorage,
    });

    getRegisteredReducers()[key] = (reducer as unknown as TReducer<{}>);
}
