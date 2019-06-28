import { Dispatch } from 'redux';
import { ITraceableApiErrorBase } from '@snipsonian/core/src/typings/apiErrors';
import { IAction } from '@snipsonian/redux/src/action/types';
import { createAction } from '@snipsonian/redux/src/action/createAction';
import {
    UPDATE_ENTITIES_GENERIC,
    UPDATE_ASYNC_ENTITIES,
} from './actionTypes';
import {
    IUpdateEntitiesGenericPayload,
    IUpdateAsyncEntitiesActionCreatorChain,
    IUpdateAsyncEntitiesPayload,
    IEntityKeyOperation,
    IEntityKeyOperationSucceeded,
    IEntityKeyOperationFailed,
} from './types';

export function updateEntitiesGeneric<EntitiesReducerState>(
    payload: IUpdateEntitiesGenericPayload<EntitiesReducerState>,
): IAction<IUpdateEntitiesGenericPayload<EntitiesReducerState>> {
    return createAction(UPDATE_ENTITIES_GENERIC, payload);
}

export function updateAsyncEntitiesChain<Error = ITraceableApiErrorBase<{}>>(
    dispatch: Dispatch<IAction<{}>>,
): IUpdateAsyncEntitiesActionCreatorChain<Error> {
    const payload: IUpdateAsyncEntitiesPayload<Error> = {};

    const chain: IUpdateAsyncEntitiesActionCreatorChain<Error> = {
        trigger: (...keys: IEntityKeyOperation[]) => {
            payload.triggerKeys = keys;
            return chain;
        },

        triggerWithoutDataReset: (...keys: IEntityKeyOperation[]) => {
            payload.triggerWithoutDataResetKeys = keys;
            return chain;
        },

        succeeded: (...keys: IEntityKeyOperationSucceeded[]) => {
            payload.succeededKeys = keys;
            return chain;
        },

        failed: (...keys: IEntityKeyOperationFailed<Error>[]) => {
            payload.failedKeys = keys;
            return chain;
        },

        cancel: (...keys: IEntityKeyOperation[]) => {
            payload.cancelKeys = keys;
            return chain;
        },

        reset: (...keys: IEntityKeyOperation[]) => {
            payload.resetKeys = keys;
            return chain;
        },

        resetWithoutDataReset: (...keys: IEntityKeyOperation[]) => {
            payload.resetWithoutDataResetKeys = keys;
            return chain;
        },

        getAction: () => createAction(UPDATE_ASYNC_ENTITIES, payload),

        dispatch: () => dispatch(
            chain.getAction(),
        ),
    };

    return chain;
}
