import { Action, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import conditionalCatch from '@snipsonian/core/src/error/conditionalCatch';
import { IBrowserStorage } from '@snipsonian/browser/src/storage/browserStorageFactory';
import assert from '@snipsonian/core/src/assert';
import isSet from '@snipsonian/core/src/is/isSet';
import { IReducerKeyToTransformReducerStateMap } from '../reducer/reducerManager';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IStateStorage extends IBrowserStorage {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    getState: () => object;
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

    const createMiddleware = (): Middleware =>
        (store: MiddlewareAPI<Dispatch<Action>, {}>) => (next: Dispatch<Action>) => (action: Action) => {
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
        storage.save({
            key: stateStorageKey,
            value: getStateToStore(state),
        });
    }

    function readState(): object {
        return storage.read({
            key: stateStorageKey,
            defaultValue: {},
        }) as object;
    }

    function removeState(): void {
        storage.remove({
            key: stateStorageKey,
        });
    }

    function getStateToStore(state: object): object {
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
