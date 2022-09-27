import { ITraceableApiErrorBase } from '@snipsonian/core/src/typings/apiErrors';
import {
    TNrOfParentNotificationLevelsToTrigger,
} from '../../observer/extendNotificationsToTrigger';
import { Dispatch } from '../types';

export type TEntityKey = string;

export interface IEntitiesStateBase {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [entityKey: string]: IAsyncEntity<any>;
}

/* Keep in sync with fields in IAsyncEntity and IAsyncEntityKey2ApiConfigMap */
export enum AsyncOperation {
    fetch = 'fetch',
    create = 'create',
    update = 'update',
    remove = 'remove',
}

export const ALL_ASYNC_OPERATIONS: AsyncOperation[] = Object.values(AsyncOperation);

// eslint-disable-next-line @typescript-eslint/ban-types
export interface IAsyncEntity<Data, Error = ITraceableApiErrorBase<{}>> {
    data: Data;
    fetch?: IAsyncEntityOperation<Error>;
    create?: IAsyncEntityOperation<Error>;
    update?: IAsyncEntityOperation<Error>;
    remove?: IAsyncEntityOperation<Error>;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface IAsyncEntityOperation<Error = ITraceableApiErrorBase<{}>> {
    status: AsyncStatus;
    error: Error;
}

export enum AsyncStatus {
    Initial = 'initial',
    Busy = 'busy',
    Success = 'success',
    Error = 'error',
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface IAsyncEntityKeyConfigs<Error = ITraceableApiErrorBase<{}>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [asyncEntityKey: string]: IAsyncEntityKeyConfig<any, Error>;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface IAsyncEntityKeyConfig<Data, Error = ITraceableApiErrorBase<{}>> {
    operations: AsyncOperation[];
    initialState: IAsyncEntity<Data, Error>;
}

/* eslint-disable max-len */

// eslint-disable-next-line @typescript-eslint/ban-types
export interface IAsyncEntitiesManager<State, StateChangeNotificationKey, Error = ITraceableApiErrorBase<{}>> {
    registerEntity<Data>(props: IRegisterEntityProps<Data, StateChangeNotificationKey>): IRegisteredEntity<State, Data, StateChangeNotificationKey, Error>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getAsyncEntityConfig<Data = any>(props: { asyncEntityKey: TEntityKey }): IAsyncEntityKeyConfig<Data, Error>;
    getEntitiesInitialState(): IEntitiesInitialState;
}

export interface IRegisterEntityProps<Data, StateChangeNotificationKey> {
    asyncEntityKey: TEntityKey;
    operations: AsyncOperation[];
    initialData?: Data;
    includeUpdaters?: boolean; // default false
    /* The default notification(s) to trigger for this entity. Can be overruled per 'updater' or async trigger */
    notificationsToTrigger: StateChangeNotificationKey[];
    nrOfParentNotificationLevelsToTrigger?: TNrOfParentNotificationLevelsToTrigger;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface IRegisteredEntity<State, Data, StateChangeNotificationKey, Error = ITraceableApiErrorBase<{}>> {
    select: (state?: State) => IAsyncEntity<Data, Error>;
    updaters?: IRegisteredEntityUpdaters<Data, StateChangeNotificationKey, Error>;
    async: IRegisteredEntityAsyncTriggers<State, Data, StateChangeNotificationKey>;
}

export interface IRegisteredEntityUpdaters<Data, StateChangeNotificationKey, Error> {
    fetch?: IRegisteredOperationUpdaters<Data, StateChangeNotificationKey, Error>;
    create?: IRegisteredOperationUpdaters<Data, StateChangeNotificationKey, Error>;
    update?: IRegisteredOperationUpdaters<Data, StateChangeNotificationKey, Error>;
    remove?: IRegisteredOperationUpdaters<Data, StateChangeNotificationKey, Error>;
}

export interface IRegisteredOperationUpdaters<Data, StateChangeNotificationKey, Error> {
    trigger(options?: IOperationUpdaterOptions<StateChangeNotificationKey>): void;
    triggerWithoutDataReset(options?: IOperationUpdaterOptions<StateChangeNotificationKey>): void;
    succeeded(data: Data, options?: IOperationUpdaterOptions<StateChangeNotificationKey>): void;
    succeededWithoutDataSet(options?: IOperationUpdaterOptions<StateChangeNotificationKey>): void;
    failed(error: Error, options?: IOperationUpdaterOptions<StateChangeNotificationKey>): void;
    cancel(options?: IOperationUpdaterOptions<StateChangeNotificationKey>): void;
    reset(options?: IOperationUpdaterOptions<StateChangeNotificationKey>): void;
    resetWithoutDataReset(options?: IOperationUpdaterOptions<StateChangeNotificationKey>): void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IOperationUpdaterOptions<StateChangeNotificationKey>
    extends IAsyncEntityOperationNotificationProps<StateChangeNotificationKey> {}

export interface IAsyncEntityUpdaters<Data, Error> {
    trigger(entity: IAsyncEntity<Data, Error>, initialData: Data): IAsyncEntity<Data, Error>;
    triggerWithoutDataReset(entity: IAsyncEntity<Data, Error>): IAsyncEntity<Data, Error>;
    succeeded(entity: IAsyncEntity<Data, Error>, data: Data): IAsyncEntity<Data, Error>;
    succeededWithoutDataSet(entity: IAsyncEntity<Data, Error>): IAsyncEntity<Data, Error>;
    failed(entity: IAsyncEntity<Data, Error>, error: Error): IAsyncEntity<Data, Error>;
    cancel(entity: IAsyncEntity<Data, Error>): IAsyncEntity<Data, Error>;
    reset(entity: IAsyncEntity<Data, Error>, initialData: Data): IAsyncEntity<Data, Error>;
    resetWithoutDataReset(entity: IAsyncEntity<Data, Error>): IAsyncEntity<Data, Error>;
}

export interface IAsyncEntityTriggerResolveValue<ApiResult> {
    wasTriggered: boolean;
    asyncResult: ApiResult | null;
}

export interface IRegisteredEntityAsyncTriggers<State, Data, StateChangeNotificationKey> {
    /* these async triggers return - within a promise - a boolean if it indeed was triggered (true) or not (false) */
    fetch?: <ApiInput = unknown, ApiResult = Data, ApiResponse = ApiResult>(
        props: ITriggerAsyncEntityFetchProps<State, ApiInput, StateChangeNotificationKey, ApiResult, ApiResponse>,
    ) => Promise<IAsyncEntityTriggerResolveValue<ApiResult>>;
    create?: <ApiInput = unknown, ApiResult = Data, ApiResponse = ApiResult>(
        props: ITriggerAsyncEntityCreateProps<State, ApiInput, StateChangeNotificationKey, ApiResult, ApiResponse>,
    ) => Promise<IAsyncEntityTriggerResolveValue<ApiResult>>;
    update?: <ApiInput = unknown, ApiResult = Data, ApiResponse = ApiResult>(
        props: ITriggerAsyncEntityUpdateProps<State, ApiInput, StateChangeNotificationKey, ApiResult, ApiResponse>,
    ) => Promise<IAsyncEntityTriggerResolveValue<ApiResult>>;
    remove?: <ApiInput = unknown, ApiResult = Data, ApiResponse = ApiResult>(
        props: ITriggerAsyncEntityRemoveProps<State, ApiInput, StateChangeNotificationKey, ApiResult, ApiResponse>,
    ) => Promise<IAsyncEntityTriggerResolveValue<ApiResult>>;
}

export interface ITriggerAsyncEntityFetchProps<State, ApiInput, StateChangeNotificationKey, ApiResult, ApiResponse>
    extends ITriggerAsyncEntityOperationBaseProps<State, ApiInput, StateChangeNotificationKey, ApiResult, ApiResponse>,
    IShouldFetchEntityProps<State>,
    IShouldResetEntityOnTrigger<State> {}

export interface ITriggerAsyncEntityCreateProps<State, ApiInput, StateChangeNotificationKey, ApiResult, ApiResponse>
    extends ITriggerAsyncEntityOperationBaseProps<State, ApiInput, StateChangeNotificationKey, ApiResult, ApiResponse>{

    updateDataOnSuccess?: boolean; // default false
    /* default same value as 'updateDataOnSuccess' because the idea is that, if you set updateDataOnSuccess=true
       because the create-api-call returns the created entity, then it is as if the entity was fetched successfully */
    markAsFetchedOnSuccess?: boolean;
}

export interface ITriggerAsyncEntityUpdateProps<State, ApiInput, StateChangeNotificationKey, ApiResult, ApiResponse>
    extends ITriggerAsyncEntityOperationBaseProps<State, ApiInput, StateChangeNotificationKey, ApiResult, ApiResponse>{

    updateDataOnSuccess?: boolean; // default false
}

export interface ITriggerAsyncEntityRemoveProps<State, ApiInput, StateChangeNotificationKey, ApiResult, ApiResponse>
    extends ITriggerAsyncEntityOperationBaseProps<State, ApiInput, StateChangeNotificationKey, ApiResult, ApiResponse>{

    markAsNotFetchedOnSuccess?: boolean; // default true
}

export interface ITriggerAsyncEntityOperationBaseProps<State, ApiInput, StateChangeNotificationKey, ApiResult, ApiResponse>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extends IAsyncEntityOperationHooks<State, ApiInput, ApiResult, ApiResponse>, IAsyncEntityOperationNotificationProps<StateChangeNotificationKey> {

    api: (apiInput: ApiInput) => Promise<ApiResponse>;
    /* only to be configured if input needed */
    apiInputSelector?: (props: { state: State }) => ApiInput;
    /* only to be configured if api response has to be mapped */
    mapApiResponse?: (props: { response: ApiResponse; state: State }) => ApiResult;
}

export interface IAsyncEntityOperationNotificationProps<StateChangeNotificationKey> {
    notificationsToTrigger?: StateChangeNotificationKey[];
    nrOfParentNotificationLevelsToTrigger?: TNrOfParentNotificationLevelsToTrigger;
}

/* some hooks that can be used e.g. to trigger flash messages */
export interface IAsyncEntityOperationHooks<State, ApiInput, ApiResult, ApiResponse = ApiResult> {
    onTrigger?: (props: { state: State; dispatch: Dispatch }) => void;
    onPreSuccess?: (props: { apiResponse: ApiResponse; apiResult: ApiResult; apiInput: ApiInput; state: State; dispatch: Dispatch }) => void;
    onSuccess?: TOnAsyncEntityOperationSuccess<State, ApiInput, ApiResult, ApiResponse>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/ban-types
    onError?: <ApiError extends ITraceableApiErrorBase<any> = ITraceableApiErrorBase<{}>>(props: { error: ApiError; state: State; dispatch: Dispatch }) => void;
}

/* eslint-enable max-len */

export interface IShouldFetchEntityProps<State> {
    shouldFetch?: (props: { state: State }) => boolean; // default true
    /* refreshMode indicates what should happen if the entity data is already available */
    refreshMode?: TRefreshMode<State>; // default 'always'
}

export interface IShouldResetEntityOnTrigger<State> {
    resetDataOnTriggerMode?: TResetMode<State>; // default 'always'
}

export type TOnAsyncEntityOperationSuccess<State, ApiInput, ApiResult, ApiResponse = ApiResult> =
    // eslint-disable-next-line max-len
    (props: { apiResponse: ApiResponse; apiResult: ApiResult; apiInput: ApiInput; state: State; dispatch: Dispatch }) => void;

export type TRefreshMode<State> = 'never' | 'always' | TOnlyRefreshIf<State>;
export type TResetMode<State> = 'never' | 'always' | TOnlyResetIf<State>;

export type TOnlyRefreshIf<State> = (props: { state: State }) => boolean;
export type TOnlyResetIf<State> = (props: { state: State }) => boolean;

export interface IEntitiesInitialState {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: IAsyncEntity<any>;
}

export interface IWithKeyIndex {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}
