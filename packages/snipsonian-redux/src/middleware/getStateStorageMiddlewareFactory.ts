import { Action, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import conditionalCatch from '@snipsonian/core/src/error/conditionalCatch';
import { IBrowserStorage } from '@snipsonian/browser/src/storage/browserStorageFactory';
import assert from '@snipsonian/core/src/assert';
import isSet from '@snipsonian/core/src/is/isSet';
import { IReducerKeyToTransformReducerStateMap } from '../reducer/reducerManager';

export interface IStateStorage extends IBrowserStorage {}

export type TOnMiddlewareError = (error: any) => any;

export interface IStateStorageMiddlewareFactoryConfig {
    storage: IStateStorage;
    stateStorageKey: string;
    shouldCatchErrors?: boolean;
    onError?: TOnMiddlewareError;
    reducerKeyToTransformReducerStateMap: IReducerKeyToTransformReducerStateMap;
}

export interface IStateStorageMiddlewareFactory {
    createMiddleware: () => Middleware;
    getState: () => any;
    destroyState: () => void;
}

export default function getStateStorageMiddlewareFactory({
    storage,
    stateStorageKey,
    shouldCatchErrors = false,
    onError,
    reducerKeyToTransformReducerStateMap,
}: IStateStorageMiddlewareFactoryConfig): IStateStorageMiddlewareFactory {
    if (shouldCatchErrors) {
        assert(onError, isSet, 'Missing onError. Needed because shouldCatchErrors is true.');
    }

    const createMiddleware = () =>
        (store: MiddlewareAPI<Dispatch<Action>, {}>) => (next: Dispatch<Action>) => (action: Action) => {
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

    function saveState(state: object) {
        storage.save({
            key: stateStorageKey,
            value: getStateToStore(state),
        });
    }

    function readState() {
        return storage.read({
            key: stateStorageKey,
            defaultValue: {},
        });
    }

    function removeState() {
        storage.remove({
            key: stateStorageKey,
        });
    }

    function getStateToStore(state: object) {
        return Object.keys(state)
            .reduce(
                (stateAccumulator, reducerKey) => {
                    let transformReducerStateForStorage = reducerKeyToTransformReducerStateMap[reducerKey];
                    if (!transformReducerStateForStorage) {
                        transformReducerStateForStorage = (reducerState) => reducerState;
                    }

                    return Object.assign(stateAccumulator, {
                        [reducerKey]: transformReducerStateForStorage(state[reducerKey]),
                    });
                },
                {},
            );
    }
}
