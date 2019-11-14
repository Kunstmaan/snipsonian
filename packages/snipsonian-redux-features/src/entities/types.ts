import { ITraceableApiErrorBase } from '@snipsonian/core/src/typings/apiErrors';
import { IAction } from '@snipsonian/redux/src/action/types';
import { ICreateNewState } from '@snipsonian/redux/src/reducer/createActionHandler';

export type TEntityKey = string;

export interface IBaseEntitiesReducerState {
    [entityKey: string]: IEntity;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IEntity<Data = any> {
    data: Data;
}

export interface IEntityAsyncOperation<Error = ITraceableApiErrorBase<{}>> {
    status: AsyncStatus;
    error: Error;
}

/* Keep in sync with fields in IAsyncEntity */
export enum AsyncOperation {
    fetch = 'fetch',
    create = 'create',
    update = 'update',
    remove = 'remove',
}

export interface IAsyncEntity<Data, Error = ITraceableApiErrorBase<{}>> extends IEntity<Data> {
    fetch?: IEntityAsyncOperation<Error>;
    create?: IEntityAsyncOperation<Error>;
    update?: IEntityAsyncOperation<Error>;
    remove?: IEntityAsyncOperation<Error>;
}

export enum AsyncStatus {
    Initial = 'initial',
    Busy = 'busy',
    Success = 'success',
    Error = 'error',
}

export type TInitialDataType = 'object' | 'array' | 'other';

export interface IUpdateEntitiesGenericPayload<EntitiesReducerState> {
    updateReducerState: ICreateNewState<EntitiesReducerState>;
}

export interface IUpdateAsyncEntitiesPayload<Error = ITraceableApiErrorBase<{}>> {
    triggerKeys?: IEntityKeyOperation[];
    triggerWithoutDataResetKeys?: IEntityKeyOperation[];
    succeededKeys?: IEntityKeyOperationSucceeded[];
    failedKeys?: IEntityKeyOperationFailed<Error>[];
    cancelKeys?: IEntityKeyOperation[];
    resetKeys?: IEntityKeyOperation[];
    resetWithoutDataResetKeys?: IEntityKeyOperation[];
}

export interface IEntityKeyOperation {
    key: TEntityKey;
    operation: AsyncOperation;
}

export interface IEntityKeyOperationSucceeded extends IEntityKeyOperation {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}

export interface IEntityKeyOperationFailed<Error> extends IEntityKeyOperation {
    error: Error;
}

export interface IUpdateAsyncEntitiesActionCreatorChain<Error = ITraceableApiErrorBase<{}>> {
    trigger: (...keys: IEntityKeyOperation[]) => IUpdateAsyncEntitiesActionCreatorChain<Error>;
    triggerWithoutDataReset: (...keys: IEntityKeyOperation[]) => IUpdateAsyncEntitiesActionCreatorChain<Error>;
    succeeded: (...keys: IEntityKeyOperationSucceeded[]) => IUpdateAsyncEntitiesActionCreatorChain<Error>;
    failed: (...keys: IEntityKeyOperationFailed<Error>[]) => IUpdateAsyncEntitiesActionCreatorChain<Error>;
    cancel: (...keys: IEntityKeyOperation[]) => IUpdateAsyncEntitiesActionCreatorChain<Error>;
    reset: (...keys: IEntityKeyOperation[]) => IUpdateAsyncEntitiesActionCreatorChain<Error>;
    resetWithoutDataReset: (...keys: IEntityKeyOperation[]) => IUpdateAsyncEntitiesActionCreatorChain<Error>;
    getAction: () => IAction<IUpdateAsyncEntitiesPayload<Error>>;
    dispatch: () => void;
}

export interface IActionType2AsyncEntitiesToFetchMap<State, Action> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [actionType: string]: IAsyncEntityToFetch<State, Action, any>[];
}

export interface IAsyncEntityToFetch<State, Action, ApiInput> {
    entityKey: TEntityKey;
    /* only to be configured if input needed and if api input depends on the (route)action
       (takes precedence over the one in IFetchAsyncEntityApiConfig) */
    apiInputSelector?: (props: { state: State; action: Action }) => ApiInput;
    shouldFetch?: (props: { state: State }) => boolean;
    refreshMode?: TRefreshMode<State, Action>; // default 'always'
    resetDataOnTrigger?: boolean; // default true
}

export type TRefreshMode<State, Action> = 'never' | 'always' | TOnlyRefreshIf<State, Action>;

export type TOnlyRefreshIf<State, Action> = (props: { state: State; action: Action }) => boolean;

export interface IAsyncEntityKey2FetchApiConfigMap<State> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [asyncEntityKey: string]: IFetchAsyncEntityApiConfig<State, any, any>;
}

export interface IFetchAsyncEntityApiConfig<State, Result, ApiInput> {
    api: (apiInput: ApiInput) => Promise<Result>;
    /* only to be configured if input needed and apiInputSelector not configured on the (route)action */
    apiInputSelector?: (props: { state: State }) => ApiInput;
    mapDataResult?: (props: { dataResult: Result; state: State }) => Result;
}

export interface IAsyncEntityKey2ApiConfigMap<State> {
    [asyncEntityKey: string]: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetch?: IFetchAsyncEntityApiConfig<State, any, any>;
        create?: {}; // TODO
        update?: {}; // TODO
        remove?: {}; // TODO
    };
}
