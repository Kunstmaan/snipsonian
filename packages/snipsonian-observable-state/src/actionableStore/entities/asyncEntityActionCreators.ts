import isSet from '@snipsonian/core/src/is/isSet';
import { ITraceableApiErrorBase } from '@snipsonian/core/src/typings/apiErrors';
import { IObservableStateAction } from '../types';
import { createObservableStateAction } from '../actionCreators';
import {
    TNrOfParentNotificationLevelsToTrigger,
} from '../../observer/extendNotificationsToTrigger';
import { ISetState } from '../../store/types';
import {
    AsyncOperation,
    IAsyncEntity,
    IAsyncEntityOperationHooks,
    IAsyncEntityUpdaters,
    IEntitiesInitialState,
    IOperationUpdaterOptions,
    IWithKeyIndex,
    TEntityKey,
} from './types';
import { ASYNC_OPERATION_2_ASYNC_ENTITY_UPDATERS } from './asyncEntityUpdaters';

export interface IAsyncEntityActionCreators
// eslint-disable-next-line @typescript-eslint/ban-types
<State, ExtraProcessInput, StateChangeNotificationKey, Error = ITraceableApiErrorBase<{}>, ActionType = string> {
    getAsyncEntity<Data>(state: State, asyncEntityKey: TEntityKey): IAsyncEntity<Data, Error>;

    updateAsyncEntityInState<Data>(
        props: IUpdateAsyncEntityInStateProps<State, StateChangeNotificationKey, Data, Error>
    ): void;

    fetchAsyncEntityAction<ApiInput, ApiResult, ApiResponse = ApiResult>(
        // eslint-disable-next-line max-len
        props: ICreateFetchAsyncEntityActionProps<State, StateChangeNotificationKey, ApiInput, ApiResult, ApiResponse>
        // eslint-disable-next-line max-len
    ): IObservableStateAction<ActionType, IAsyncEntityActionPayload, State, ExtraProcessInput, StateChangeNotificationKey>;

    createAsyncEntityAction<ApiInput, ApiResult, ApiResponse = ApiResult>(
        // eslint-disable-next-line max-len
        props: ICreateUpdateAsyncEntityActionProps<State, StateChangeNotificationKey, ApiInput, ApiResult, ApiResponse>
        // eslint-disable-next-line max-len
    ): IObservableStateAction<ActionType, IAsyncEntityActionPayload, State, ExtraProcessInput, StateChangeNotificationKey>;

    updateAsyncEntityAction<ApiInput, ApiResult, ApiResponse = ApiResult>(
        // eslint-disable-next-line max-len
        props: ICreateUpdateAsyncEntityActionProps<State, StateChangeNotificationKey, ApiInput, ApiResult, ApiResponse>
        // eslint-disable-next-line max-len
    ): IObservableStateAction<ActionType, IAsyncEntityActionPayload, State, ExtraProcessInput, StateChangeNotificationKey>;

    removeAsyncEntityAction<ApiInput, ApiResult, ApiResponse = ApiResult>(
        // eslint-disable-next-line max-len
        props: ICreateRemoveAsyncEntityActionProps<State, StateChangeNotificationKey, ApiInput, ApiResult, ApiResponse>
        // eslint-disable-next-line max-len
    ): IObservableStateAction<ActionType, IAsyncEntityActionPayload, State, ExtraProcessInput, StateChangeNotificationKey>;
}

interface IUpdateAsyncEntityInStateProps<State, StateChangeNotificationKey, Data, Error> {
    asyncEntityKey: TEntityKey;
    entityUpdater: (currentEntity: IAsyncEntity<Data, Error>) => IAsyncEntity<Data, Error>;
    options: Required<IOperationUpdaterOptions<StateChangeNotificationKey>>;
    setState: ISetState<State, StateChangeNotificationKey>;
}

interface ICreateAsyncEntityActionPropsBase
<State, StateChangeNotificationKey, ApiInput, ApiResult, ApiResponse = ApiResult>
    extends IAsyncEntityOperationHooks<State, ApiInput, ApiResult, ApiResponse> {

    asyncEntityKey: TEntityKey;
    api: (apiInput: ApiInput) => Promise<ApiResponse>;
    apiInputSelector?: (props: { state: State }) => ApiInput;
    mapApiResponse?: (props: { response: ApiResponse; state: State }) => ApiResult;
    notificationsToTrigger: StateChangeNotificationKey[];
    nrOfParentNotificationLevelsToTrigger?: TNrOfParentNotificationLevelsToTrigger;
}

interface ICreateFetchAsyncEntityActionProps
<State, StateChangeNotificationKey, ApiInput, ApiResult, ApiResponse = ApiResult>
    extends ICreateAsyncEntityActionPropsBase
    <State, StateChangeNotificationKey, ApiInput, ApiResult, ApiResponse> {

    resetDataOnTrigger?: boolean; // default true
}

interface ICreateUpdateAsyncEntityActionProps
<State, StateChangeNotificationKey, ApiInput, ApiResult, ApiResponse = ApiResult>
    extends ICreateAsyncEntityActionPropsBase
    <State, StateChangeNotificationKey, ApiInput, ApiResult, ApiResponse> {

    updateDataOnSuccess?: boolean; // default false
    /* default same value as 'updateDataOnSuccess' - see also ITriggerAsyncEntityCreateProps */
    markAsFetchedOnSuccess?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ICreateRemoveAsyncEntityActionProps
<State, StateChangeNotificationKey, ApiInput, ApiResult, ApiResponse = ApiResult>
    extends ICreateAsyncEntityActionPropsBase
    <State, StateChangeNotificationKey, ApiInput, ApiResult, ApiResponse> {

    markAsNotFetchedOnSuccess?: boolean; // default true
}

interface IAsyncEntityActionPayload {
    operation: AsyncOperation;
}

// eslint-disable-next-line max-len,@typescript-eslint/ban-types
export function initAsyncEntityActionCreators<State, ExtraProcessInput, StateChangeNotificationKey = string, Error = ITraceableApiErrorBase<{}>, ActionType = string>({
    entitiesStateField = 'entities',
    getEntitiesInitialState,
}: {
    entitiesStateField?: string;
    getEntitiesInitialState: () => IEntitiesInitialState;
}): IAsyncEntityActionCreators<State, ExtraProcessInput, StateChangeNotificationKey, Error, ActionType> {
    const asyncEntityActionCreators = {
        getAsyncEntity: (state: State, asyncEntityKey: TEntityKey) =>
            (state as IWithKeyIndex)[entitiesStateField][asyncEntityKey],

        updateAsyncEntityInState: <Data>({
            asyncEntityKey,
            entityUpdater,
            options,
            setState,
        }: IUpdateAsyncEntityInStateProps<State, StateChangeNotificationKey, Data, Error>) => {
            setState({
                newState: (currentState) => {
                    const entity = asyncEntityActionCreators.getAsyncEntity(currentState, asyncEntityKey);

                    return {
                        ...currentState,
                        [entitiesStateField]: {
                            ...(currentState as IWithKeyIndex)[entitiesStateField],
                            [asyncEntityKey]: entityUpdater(entity),
                        },
                    };
                },
                notificationsToTrigger: options.notificationsToTrigger,
                nrOfParentNotificationLevelsToTrigger: options.nrOfParentNotificationLevelsToTrigger,
            });
        },

        fetchAsyncEntityAction: <ApiInput, ApiResult, ApiResponse = ApiResult>({
            asyncEntityKey,
            api,
            apiInputSelector,
            mapApiResponse,
            notificationsToTrigger,
            nrOfParentNotificationLevelsToTrigger,
            resetDataOnTrigger = true,
            onTrigger,
            onPreSuccess,
            onSuccess,
            onError,
        }: ICreateFetchAsyncEntityActionProps<State, StateChangeNotificationKey, ApiInput, ApiResult, ApiResponse>) =>
            createAsyncEntityActionBase({
                asyncEntityKey,
                api,
                apiInputSelector,
                mapApiResponse,
                notificationsToTrigger,
                nrOfParentNotificationLevelsToTrigger,
                operation: AsyncOperation.fetch,
                resetDataOnTrigger,
                updateDataOnSuccess: true,
                onTrigger,
                onPreSuccess,
                onSuccess,
                onError,
            }),

        createAsyncEntityAction: <ApiInput, ApiResult, ApiResponse = ApiResult>({
            asyncEntityKey,
            api,
            apiInputSelector,
            mapApiResponse,
            notificationsToTrigger,
            nrOfParentNotificationLevelsToTrigger,
            updateDataOnSuccess = false,
            markAsFetchedOnSuccess,
            onTrigger,
            onPreSuccess,
            onSuccess,
            onError,
        }: ICreateUpdateAsyncEntityActionProps<State, StateChangeNotificationKey, ApiInput, ApiResult, ApiResponse>) =>
            createAsyncEntityActionBase({
                asyncEntityKey,
                api,
                apiInputSelector,
                mapApiResponse,
                notificationsToTrigger,
                nrOfParentNotificationLevelsToTrigger,
                operation: AsyncOperation.create,
                resetDataOnTrigger: false,
                updateDataOnSuccess,
                markAsFetchedOnSuccess: isSet(markAsFetchedOnSuccess) ? markAsFetchedOnSuccess : updateDataOnSuccess,
                onTrigger,
                onPreSuccess,
                onSuccess,
                onError,
            }),

        updateAsyncEntityAction: <ApiInput, ApiResult, ApiResponse = ApiResult>({
            asyncEntityKey,
            api,
            apiInputSelector,
            mapApiResponse,
            notificationsToTrigger,
            nrOfParentNotificationLevelsToTrigger,
            updateDataOnSuccess = false,
            onTrigger,
            onPreSuccess,
            onSuccess,
            onError,
        }: ICreateUpdateAsyncEntityActionProps<State, StateChangeNotificationKey, ApiInput, ApiResult, ApiResponse>) =>
            createAsyncEntityActionBase({
                asyncEntityKey,
                api,
                apiInputSelector,
                mapApiResponse,
                notificationsToTrigger,
                nrOfParentNotificationLevelsToTrigger,
                operation: AsyncOperation.update,
                resetDataOnTrigger: false,
                updateDataOnSuccess,
                onTrigger,
                onPreSuccess,
                onSuccess,
                onError,
            }),

        removeAsyncEntityAction: <ApiInput, ApiResult, ApiResponse = ApiResult>({
            asyncEntityKey,
            api,
            apiInputSelector,
            notificationsToTrigger,
            nrOfParentNotificationLevelsToTrigger,
            markAsNotFetchedOnSuccess = true,
            onTrigger,
            onPreSuccess,
            onSuccess,
            onError,
        }: ICreateRemoveAsyncEntityActionProps<State, StateChangeNotificationKey, ApiInput, ApiResult, ApiResponse>) =>
            createAsyncEntityActionBase({
                asyncEntityKey,
                api,
                apiInputSelector,
                // mapApiResponse: () => getEntitiesInitialState()[asyncEntityKey].data,
                notificationsToTrigger,
                nrOfParentNotificationLevelsToTrigger,
                operation: AsyncOperation.remove,
                resetDataOnTrigger: false,
                updateDataOnSuccess: false, // we leave the existing data
                markAsNotFetchedOnSuccess,
                onTrigger,
                onPreSuccess,
                onSuccess,
                onError,
            }),
    };

    return asyncEntityActionCreators;

    function createAsyncEntityActionBase<ApiInput, ApiResult, ApiResponse = ApiResult>({
        asyncEntityKey,
        api,
        apiInputSelector,
        mapApiResponse,
        notificationsToTrigger,
        nrOfParentNotificationLevelsToTrigger,
        operation,
        resetDataOnTrigger,
        updateDataOnSuccess,
        markAsFetchedOnSuccess = false,
        markAsNotFetchedOnSuccess = false,
        onTrigger,
        onPreSuccess,
        onSuccess,
        onError,
        // eslint-disable-next-line max-len
    }: ICreateAsyncEntityActionPropsBase<State, StateChangeNotificationKey, ApiInput, ApiResult, ApiResponse> & {
        operation: AsyncOperation;
        resetDataOnTrigger: boolean;
        updateDataOnSuccess: boolean;
        markAsFetchedOnSuccess?: boolean;
        markAsNotFetchedOnSuccess?: boolean;
    }) {
        // eslint-disable-next-line max-len
        return createObservableStateAction<ActionType, IAsyncEntityActionPayload, State, ExtraProcessInput, StateChangeNotificationKey>({
            type: `${asyncEntityKey}_${operation.toUpperCase()}` as unknown as ActionType,
            payload: {
                operation,
            },
            async process({ getState, setState, dispatch }) {
                // eslint-disable-next-line max-len
                const asyncEntityUpdaters = ASYNC_OPERATION_2_ASYNC_ENTITY_UPDATERS[operation] as unknown as IAsyncEntityUpdaters<ApiResult, Error>;
                // eslint-disable-next-line max-len
                const asyncEntityUpdatersFetch = ASYNC_OPERATION_2_ASYNC_ENTITY_UPDATERS[AsyncOperation.fetch] as unknown as IAsyncEntityUpdaters<ApiResult, Error>;

                try {
                    // eslint-disable-next-line arrow-body-style
                    asyncEntityActionCreators.updateAsyncEntityInState<ApiResult>({
                        // eslint-disable-next-line arrow-body-style
                        entityUpdater: (entity) => {
                            return resetDataOnTrigger
                                ? asyncEntityUpdaters.trigger(entity, getEntitiesInitialState()[asyncEntityKey].data)
                                : asyncEntityUpdaters.triggerWithoutDataReset(entity);
                        },
                        asyncEntityKey,
                        setState,
                        options: {
                            notificationsToTrigger,
                            nrOfParentNotificationLevelsToTrigger,
                        },
                    });

                    if (onTrigger) {
                        onTrigger({ state: getState(), dispatch });
                    }

                    const apiInput = isSet(apiInputSelector)
                        ? apiInputSelector({ state: getState() })
                        : {} as ApiInput;

                    const apiResponse = await api(apiInput);

                    const apiResult = isSet(mapApiResponse)
                        ? mapApiResponse({ response: apiResponse, state: getState() })
                        : (apiResponse as unknown as ApiResult);

                    if (onPreSuccess) {
                        onPreSuccess({ apiResponse, apiResult, apiInput, state: getState(), dispatch });
                    }

                    // eslint-disable-next-line arrow-body-style
                    asyncEntityActionCreators.updateAsyncEntityInState<ApiResult>({
                        // eslint-disable-next-line arrow-body-style
                        entityUpdater: (entity) => {
                            const updatedEntity = updateDataOnSuccess
                                ? asyncEntityUpdaters.succeeded(entity, apiResult)
                                : asyncEntityUpdaters.succeededWithoutDataSet(entity);

                            if (markAsFetchedOnSuccess) {
                                return asyncEntityUpdatersFetch.succeededWithoutDataSet(updatedEntity);
                            }
                            if (markAsNotFetchedOnSuccess) {
                                return asyncEntityUpdatersFetch.resetWithoutDataReset(updatedEntity);
                            }

                            return updatedEntity;
                        },
                        asyncEntityKey,
                        setState,
                        options: {
                            notificationsToTrigger,
                            nrOfParentNotificationLevelsToTrigger,
                        },
                    });

                    if (onSuccess) {
                        onSuccess({ apiResponse, apiResult, apiInput, state: getState(), dispatch });
                    }
                } catch (error: unknown) {
                    asyncEntityActionCreators.updateAsyncEntityInState<ApiResult>({
                        entityUpdater: (entity) => asyncEntityUpdaters.failed(
                            entity,
                            error as Error,
                        ),
                        asyncEntityKey,
                        setState,
                        options: {
                            notificationsToTrigger,
                            nrOfParentNotificationLevelsToTrigger,
                        },
                    });

                    if (onError) {
                        onError({
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            error: error as ITraceableApiErrorBase<any>,
                            state: getState(),
                            dispatch,
                        });
                    }
                }
            },
        });
    }
}
