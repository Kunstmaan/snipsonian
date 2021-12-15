import { Action, Dispatch, Middleware, MiddlewareAPI } from 'redux';
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

    const createMiddleware = (): Middleware =>
        (store: MiddlewareAPI<Dispatch<Action>, object>) => (next: Dispatch<Action>) => (action: Action) => {
            const r = next(action);
            conditionalCatch({
                shouldCatchErrors,
                actionToExecute: () => saveState(store.getState()),
                onError,
            });
            return r;
        };

    const getState = (): object =>
        readState();

    const destroyState = (): void => {
        removeState();
    };

    return {
        createMiddleware,
        getState,
        destroyState,
    };

    function saveState(state: object): void {
        storageToReducerKeysConfigs
            .forEach((config) => {
                const reducerKeysToStore = config.reducerKeys;
                const statePart = extractReducerStateParts(state, reducerKeysToStore);
                saveStatePart(config.storage, statePart);
            });
    }

    function extractReducerStateParts(state: object, reducerKeysToStore: string[]): object {
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

    function saveStatePart(storage: IStateStorage, statePart: object): void {
        storage.save({
            key: stateStorageKey,
            value: statePart,
        });
    }

    function readState(): object {
        const initialValue = {};

        return storageToReducerKeysConfigs
            .map((config) => config.storage)
            .reduce(
                (accumulator, storage) =>
                    Object.assign(accumulator, readStatePart(storage)),
                initialValue,
            );
    }

    function readStatePart(storage: IStateStorage): object {
        return storage.read({
            key: stateStorageKey,
            defaultValue: {},
        }) as object;
    }

    function removeState(): void {
        storageToReducerKeysConfigs
            .map((config) => config.storage)
            .forEach(removeStatePart);
    }

    function removeStatePart(storage: IStateStorage): void {
        storage.remove({
            key: stateStorageKey,
        });
    }
}
