import assert from '@snipsonian/core/src/assert';
import isSet from '@snipsonian/core/src/is/isSet';
import conditionalCatch from '@snipsonian/core/src/error/conditionalCatch';
import {
    IStateStorage,
    IStateStorageMiddlewareFactory,
    IStateStorageMiddlewareFactoryConfig,
} from './getStateStorageMiddlewareFactory';
import { STATE_STORAGE_TYPE } from '../config/storageType';

export interface IStorageToReducerKeysConfig {
    storageType: STATE_STORAGE_TYPE;
    storage: IStateStorage;
    reducerKeys: string[];
}

export interface IStateStorageByReducerMiddlewareFactoryConfig extends Pick<
    IStateStorageMiddlewareFactoryConfig,
    'stateStorageKey' | 'shouldCatchErrors' | 'onError' | 'reducerKeyToTransformReducerStateMap'
> {
    storageToReducerKeysConfigs: IStorageToReducerKeysConfig[];
}

export default function getStateStorageByReducerMiddlewareFactory({
    storageToReducerKeysConfigs,
    stateStorageKey,
    shouldCatchErrors = false,
    onError,
    reducerKeyToTransformReducerStateMap,
}: IStateStorageByReducerMiddlewareFactoryConfig): IStateStorageMiddlewareFactory {
    if (shouldCatchErrors) {
        assert(onError, isSet, 'Missing onError. Needed because shouldCatchErrors is true.');
    }

    const createMiddleware = () =>
        (store) => (next) => (action) => {
            const r = next(action);
            conditionalCatch({
                shouldCatchErrors,
                actionToExecute: () => saveState(store.getState()),
                onError,
            });
            return r;
        };

    const getState = () =>
        readState();

    const destroyState = () => {
        removeState();
    };

    return {
        createMiddleware,
        getState,
        destroyState,
    };

    function saveState(state) {
        storageToReducerKeysConfigs
            .forEach((config) => {
                const reducerKeysToStore = config.reducerKeys;
                const statePart = extractReducerStateParts(state, reducerKeysToStore);
                saveStatePart(config.storage, statePart);
            });
    }

    function extractReducerStateParts(state, reducerKeysToStore) {
        const initialValue = {};

        return reducerKeysToStore.reduce(
            (accumulator, reducerKey) => {
                const transformReducerStateForStorage = reducerKeyToTransformReducerStateMap[reducerKey];

                return Object.assign(accumulator, {
                    [reducerKey]: transformReducerStateForStorage(state[reducerKey]),
                });
            },
            initialValue,
        );
    }

    function saveStatePart(storage, statePart) {
        storage.save({
            key: stateStorageKey,
            value: statePart,
        });
    }

    function readState() {
        const initialValue = {};

        return storageToReducerKeysConfigs
            .map((config) => config.storage)
            .reduce(
                (accumulator, storage) =>
                    Object.assign(accumulator, readStatePart(storage))
                ,
                initialValue,
            );
    }

    function readStatePart(storage) {
        return storage.read({
            key: stateStorageKey,
            defaultValue: {},
        });
    }

    function removeState() {
        storageToReducerKeysConfigs
            .map((config) => config.storage)
            .forEach(removeStatePart);
    }

    function removeStatePart(storage) {
        storage.remove({
            key: stateStorageKey,
        });
    }
}
