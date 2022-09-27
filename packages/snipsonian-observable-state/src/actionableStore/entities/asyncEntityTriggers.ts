import isSet from '@snipsonian/core/src/is/isSet';
import { IActionableObservableStateStore } from '../types';
import {
    TEntityKey,
    ITriggerAsyncEntityFetchProps,
    ITriggerAsyncEntityCreateProps,
    ITriggerAsyncEntityUpdateProps,
    ITriggerAsyncEntityRemoveProps,
    IShouldFetchEntityProps,
    AsyncStatus,
    IShouldResetEntityOnTrigger,
    IAsyncEntityOperationNotificationProps,
    IAsyncEntityTriggerResolveValue,
} from './types';
import { IAsyncEntityActionCreators } from './asyncEntityActionCreators';

/* eslint-disable max-len */

interface IAsyncEntityTriggers<State, StateChangeNotificationKey> {
    /* these async triggers return - within a promise - a boolean if it indeed was triggered (true) or not (false) */
    fetch: <ApiInput, ApiResult, ApiResponse = ApiResult>(
        props: ITriggerAsyncEntityFetchProps<State, ApiInput, StateChangeNotificationKey, ApiResult, ApiResponse> & IAsyncEntityTriggerBaseInput<StateChangeNotificationKey>
    ) => Promise<IAsyncEntityTriggerResolveValue<ApiResult>>;
    create: <ApiInput, ApiResult, ApiResponse = ApiResult>(
        props: ITriggerAsyncEntityCreateProps<State, ApiInput, StateChangeNotificationKey, ApiResult, ApiResponse> & IAsyncEntityTriggerBaseInput<StateChangeNotificationKey>
    ) => Promise<IAsyncEntityTriggerResolveValue<ApiResult>>;
    update: <ApiInput, ApiResult, ApiResponse = ApiResult>(
        props: ITriggerAsyncEntityUpdateProps<State, ApiInput, StateChangeNotificationKey, ApiResult, ApiResponse> & IAsyncEntityTriggerBaseInput<StateChangeNotificationKey>
    ) => Promise<IAsyncEntityTriggerResolveValue<ApiResult>>;
    remove: <ApiInput, ApiResult, ApiResponse = ApiResult>(
        props: ITriggerAsyncEntityRemoveProps<State, ApiInput, StateChangeNotificationKey, ApiResult, ApiResponse> & IAsyncEntityTriggerBaseInput<StateChangeNotificationKey>
    ) => Promise<IAsyncEntityTriggerResolveValue<ApiResult>>;
}

interface IAsyncEntityTriggerBaseInput<StateChangeNotificationKey> extends Required<IAsyncEntityOperationNotificationProps<StateChangeNotificationKey>> {
    asyncEntityKey: TEntityKey;
}

export function initAsyncEntityTriggers<State, ExtraProcessInput, StateChangeNotificationKey, Error, ActionType>({
    asyncEntityActionCreators,
    getStore,
}: {
    asyncEntityActionCreators: IAsyncEntityActionCreators<State, ExtraProcessInput, StateChangeNotificationKey, Error, ActionType>;
    getStore: () => IActionableObservableStateStore<State, StateChangeNotificationKey>;
}): IAsyncEntityTriggers<State, StateChangeNotificationKey> {
    return {
        fetch<ApiInput, ApiResult, ApiResponse = ApiResult>({
            asyncEntityKey,
            shouldFetch,
            refreshMode,
            resetDataOnTriggerMode,
            onSuccess: onSuccessInput,
            onError: onErrorInput,
            ...other
        }: ITriggerAsyncEntityFetchProps<State, ApiInput, StateChangeNotificationKey, ApiResult, ApiResponse> & IAsyncEntityTriggerBaseInput<StateChangeNotificationKey>) {
            if (!shouldFetchEntity({ asyncEntityKey, shouldFetch, refreshMode })) {
                return Promise.resolve<IAsyncEntityTriggerResolveValue<ApiResult>>({
                    wasTriggered: false,
                    asyncResult: null,
                });
            }

            const resetDataOnTrigger = shouldResetEntityOnTrigger({ asyncEntityKey, resetDataOnTriggerMode });

            return new Promise<IAsyncEntityTriggerResolveValue<ApiResult>>((resolve, reject) => {
                getStore().dispatch(asyncEntityActionCreators.fetchAsyncEntityAction<ApiInput, ApiResult, ApiResponse>({
                    asyncEntityKey,
                    resetDataOnTrigger,
                    ...other,
                    onSuccess: (onSuccessProps) => {
                        resolve({
                            wasTriggered: true,
                            asyncResult: onSuccessProps.apiResult,
                        });

                        if (onSuccessInput) {
                            onSuccessInput(onSuccessProps);
                        }
                    },
                    onError: (onErrorProps) => {
                        reject(onErrorProps.error);

                        if (onErrorInput) {
                            onErrorInput(onErrorProps);
                        }
                    },
                }));
            });
        },

        create<ApiInput, ApiResult, ApiResponse = ApiResult>({
            asyncEntityKey,
            updateDataOnSuccess,
            markAsFetchedOnSuccess,
            onSuccess: onSuccessInput,
            onError: onErrorInput,
            ...other
        }: ITriggerAsyncEntityCreateProps<State, ApiInput, StateChangeNotificationKey, ApiResult, ApiResponse> & IAsyncEntityTriggerBaseInput<StateChangeNotificationKey>) {
            return new Promise<IAsyncEntityTriggerResolveValue<ApiResult>>((resolve, reject) => {
                getStore().dispatch(asyncEntityActionCreators.createAsyncEntityAction<ApiInput, ApiResult, ApiResponse>({
                    asyncEntityKey,
                    updateDataOnSuccess,
                    markAsFetchedOnSuccess,
                    ...other,
                    onSuccess: (onSuccessProps) => {
                        resolve({
                            wasTriggered: true,
                            asyncResult: onSuccessProps.apiResult,
                        });

                        if (onSuccessInput) {
                            onSuccessInput(onSuccessProps);
                        }
                    },
                    onError: (onErrorProps) => {
                        reject(onErrorProps.error);

                        if (onErrorInput) {
                            onErrorInput(onErrorProps);
                        }
                    },
                }));
            });
        },

        update<ApiInput, ApiResult, ApiResponse = ApiResult>({
            asyncEntityKey,
            updateDataOnSuccess,
            onSuccess: onSuccessInput,
            onError: onErrorInput,
            ...other
        }: ITriggerAsyncEntityUpdateProps<State, ApiInput, StateChangeNotificationKey, ApiResult, ApiResponse> & IAsyncEntityTriggerBaseInput<StateChangeNotificationKey>) {
            return new Promise<IAsyncEntityTriggerResolveValue<ApiResult>>((resolve, reject) => {
                getStore().dispatch(asyncEntityActionCreators.updateAsyncEntityAction<ApiInput, ApiResult, ApiResponse>({
                    asyncEntityKey,
                    updateDataOnSuccess,
                    ...other,
                    onSuccess: (onSuccessProps) => {
                        resolve({
                            wasTriggered: true,
                            asyncResult: onSuccessProps.apiResult,
                        });

                        if (onSuccessInput) {
                            onSuccessInput(onSuccessProps);
                        }
                    },
                    onError: (onErrorProps) => {
                        reject(onErrorProps.error);

                        if (onErrorInput) {
                            onErrorInput(onErrorProps);
                        }
                    },
                }));
            });
        },

        remove<ApiInput, ApiResult, ApiResponse = ApiResult>({
            asyncEntityKey,
            markAsNotFetchedOnSuccess,
            onSuccess: onSuccessInput,
            onError: onErrorInput,
            ...other
        }: ITriggerAsyncEntityRemoveProps<State, ApiInput, StateChangeNotificationKey, ApiResult, ApiResponse> & IAsyncEntityTriggerBaseInput<StateChangeNotificationKey>) {
            return new Promise<IAsyncEntityTriggerResolveValue<ApiResult>>((resolve, reject) => {
                getStore().dispatch(asyncEntityActionCreators.removeAsyncEntityAction<ApiInput, ApiResult, ApiResponse>({
                    asyncEntityKey,
                    markAsNotFetchedOnSuccess,
                    ...other,
                    onSuccess: (onSuccessProps) => {
                        resolve({
                            wasTriggered: true,
                            asyncResult: onSuccessProps.apiResult,
                        });

                        if (onSuccessInput) {
                            onSuccessInput(onSuccessProps);
                        }
                    },
                    onError: (onErrorProps) => {
                        reject(onErrorProps.error);

                        if (onErrorInput) {
                            onErrorInput(onErrorProps);
                        }
                    },
                }));
            });
        },
    };

    function shouldFetchEntity({
        asyncEntityKey,
        shouldFetch,
        refreshMode,
    }: {
        asyncEntityKey: TEntityKey;
    } & IShouldFetchEntityProps<State>): boolean {
        const state = getStore().getState();

        if (shouldFetch && !shouldFetch({ state })) {
            return false;
        }

        const asyncEntityFetchOperation = asyncEntityActionCreators.getAsyncEntity(
            state,
            asyncEntityKey,
        ).fetch;

        const isAlreadyFetched = asyncEntityFetchOperation.status === AsyncStatus.Success;

        if (!isAlreadyFetched) {
            return true;
        }

        if (!isSet(refreshMode)) {
            return true;
        }

        if (refreshMode === 'always') {
            return true;
        }

        if (refreshMode === 'never') {
            return false;
        }

        return refreshMode({ state });
    }

    function shouldResetEntityOnTrigger({
        asyncEntityKey,
        resetDataOnTriggerMode = 'always',
    }: {
        asyncEntityKey: TEntityKey;
    } & IShouldResetEntityOnTrigger<State>): boolean {
        if (resetDataOnTriggerMode === 'always') {
            return true;
        }

        if (resetDataOnTriggerMode === 'never') {
            return false;
        }

        const state = getStore().getState();

        const currentEntityData = asyncEntityActionCreators.getAsyncEntity(
            state,
            asyncEntityKey,
        ).data;

        if (!isSet(currentEntityData)) {
            return false;
        }

        return resetDataOnTriggerMode({ state });
    }
}

/* eslint-enable max-len */
