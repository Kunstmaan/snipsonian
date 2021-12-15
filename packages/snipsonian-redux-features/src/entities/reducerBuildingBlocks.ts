import isSet from '@snipsonian/core/src/is/isSet';
import { ITraceableApiErrorBase } from '@snipsonian/core/src/typings/apiErrors';
import { IActionHandlers, TActionHandler } from '@snipsonian/redux/src/reducer/createReducer';
import { createActionHandler } from '@snipsonian/redux/src/reducer/createActionHandler';
import {
    AsyncStatus,
    IAsyncEntity,
    IBaseEntitiesReducerState,
    IUpdateEntitiesGenericPayload,
    IUpdateAsyncEntitiesPayload,
    TInitialDataType,
    IEntity,
    AsyncOperation,
} from './types';
import {
    UPDATE_ENTITIES_GENERIC,
    UPDATE_ASYNC_ENTITIES,
} from './actionTypes';

export const DEFAULT_REDUCER_KEY = 'entities';

let entitiesReducerKey: string;
let entitiesInitialState: IBaseEntitiesReducerState;

interface IReducerBuildingBlocks<EntitiesReducerState> {
    key: string;
    initialState: EntitiesReducerState;
    actionHandlers: IActionHandlers<EntitiesReducerState>;
}

export function initReducerBuildingBlocks<EntitiesReducerState extends IBaseEntitiesReducerState>({
    reducerKey = DEFAULT_REDUCER_KEY,
    initialState,
    includeDefaultActionHandlers = true,
    customActionHandlers = {},
}: {
    reducerKey?: string;
    initialState: EntitiesReducerState;
    includeDefaultActionHandlers?: boolean;
    customActionHandlers?: IActionHandlers<EntitiesReducerState>;
}): IReducerBuildingBlocks<EntitiesReducerState> {
    entitiesReducerKey = reducerKey;
    entitiesInitialState = initialState;

    const baseActionHandlers = includeDefaultActionHandlers
        ? getDefaultActionHandlers<EntitiesReducerState>()
        : {};

    return {
        key: reducerKey,
        initialState,
        actionHandlers: {
            ...baseActionHandlers,
            ...customActionHandlers,
        },
    };
}

export function getEntitiesReducerKey(): string {
    return entitiesReducerKey;
}

export function getAsyncEntityInitialState<Data = object, Error = ITraceableApiErrorBase<object>>({
    data,
    type = 'object',
    operations = [AsyncOperation.fetch],
}: {
    data?: Data;
    type?: TInitialDataType;
    operations?: AsyncOperation[];
} = {}): IAsyncEntity<Data, Error> {
    const baseEntity: IAsyncEntity<Data, Error> = {
        data: isSet(data) ? data : determineInitialData(type),
    };

    if (!operations || operations.length === 0) {
        return baseEntity;
    }

    return operations.reduce(
        (accumulator, operation) => ({
            ...accumulator,
            [operation]: {
                status: AsyncStatus.Initial,
                error: null,
            },
        }),
        baseEntity,
    );
}

// eslint-disable-next-line max-len
function getDefaultActionHandlers<EntitiesReducerState extends IBaseEntitiesReducerState>(): IActionHandlers<EntitiesReducerState> {
    return {
        [UPDATE_ENTITIES_GENERIC]:
            createActionHandler<EntitiesReducerState, IUpdateEntitiesGenericPayload<EntitiesReducerState>>(
                ({ oldState, payload }) => payload.updateReducerState({ oldState, payload }),
            ) as TActionHandler<EntitiesReducerState, object>,

        [UPDATE_ASYNC_ENTITIES]: createActionHandler<EntitiesReducerState, IUpdateAsyncEntitiesPayload>(
            ({ oldState, payload }) => {
                const newState: IBaseEntitiesReducerState = {
                    ...oldState,
                };

                if (payload.triggerKeys) {
                    payload.triggerKeys.forEach((entityKeyOperation) => {
                        newState[entityKeyOperation.key] = asyncToEntityType({
                            ...newState[entityKeyOperation.key],
                            data: entitiesInitialState[entityKeyOperation.key].data,
                            [entityKeyOperation.operation]: {
                                status: AsyncStatus.Busy,
                                error: null,
                            },
                        });
                    });
                }

                if (payload.triggerWithoutDataResetKeys) {
                    payload.triggerWithoutDataResetKeys.forEach((entityKeyOperation) => {
                        newState[entityKeyOperation.key] = asyncToEntityType({
                            ...newState[entityKeyOperation.key],
                            [entityKeyOperation.operation]: {
                                status: AsyncStatus.Busy,
                                error: null,
                            },
                        });
                    });
                }

                if (payload.succeededKeys) {
                    payload.succeededKeys.forEach((entityKeyOperation) => {
                        newState[entityKeyOperation.key] = asyncToEntityType({
                            ...newState[entityKeyOperation.key],
                            data: entityKeyOperation.data,
                            [entityKeyOperation.operation]: {
                                status: AsyncStatus.Success,
                                error: null,
                            },
                        });
                    });
                }

                if (payload.failedKeys) {
                    payload.failedKeys.forEach((entityKeyOperation) => {
                        newState[entityKeyOperation.key] = asyncToEntityType({
                            ...newState[entityKeyOperation.key],
                            [entityKeyOperation.operation]: {
                                status: AsyncStatus.Error,
                                error: entityKeyOperation.error,
                            },
                        });
                    });
                }

                if (payload.cancelKeys) {
                    payload.cancelKeys.forEach((entityKeyOperation) => {
                        newState[entityKeyOperation.key] = asyncToEntityType({
                            ...newState[entityKeyOperation.key],
                            [entityKeyOperation.operation]: {
                                // eslint-disable-next-line max-len,@typescript-eslint/no-explicit-any
                                ...(newState[entityKeyOperation.key] as IAsyncEntity<any>)[entityKeyOperation.operation],
                                status: AsyncStatus.Initial,
                            },
                        });
                    });
                }

                if (payload.resetKeys) {
                    payload.resetKeys.forEach((entityKeyOperation) => {
                        newState[entityKeyOperation.key] = {
                            ...newState[entityKeyOperation.key],
                            data: entitiesInitialState[entityKeyOperation.key].data,
                            [entityKeyOperation.operation]: {
                                status: AsyncStatus.Initial,
                                error: null,
                            },
                        };
                    });
                }

                if (payload.resetWithoutDataResetKeys) {
                    payload.resetKeys.forEach((entityKeyOperation) => {
                        newState[entityKeyOperation.key] = {
                            ...newState[entityKeyOperation.key],
                            [entityKeyOperation.operation]: {
                                status: AsyncStatus.Initial,
                                error: null,
                            },
                        };
                    });
                }

                return newState as EntitiesReducerState;
            },
        ),
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function determineInitialData(type: TInitialDataType): any {
    if (type === 'object') {
        return null;
    }
    if (type === 'array') {
        return null;
    }
    return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function asyncToEntityType<Data = any>(asyncEntity: IAsyncEntity<Data>): IEntity<Data> {
    return asyncEntity as IEntity<Data>;
}
