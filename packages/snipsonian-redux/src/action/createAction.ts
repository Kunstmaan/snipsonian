import { IAction } from './types';
import { toSuccessType, toFailType, toCancelType, toResetType } from './actionTypeGenerator';

export function createAction<Payload extends object>(
    type: string,
    payload: Payload,
): IAction<Payload> {
    return {
        type,
        payload,
    };
}

export function createSuccessAction<P extends object>(
    type: string, payload: P,
): IAction<P> {
    return createAction(toSuccessType(type), payload);
}

export function createFailAction<P extends object>(
    type: string, payload: P,
): IAction<P> {
    return createAction(toFailType(type), payload);
}

export function createCancelAction<P extends object>(
    type: string, payload: P,
): IAction<P> {
    return createAction(toCancelType(type), payload);
}

export function createResetAction<P extends object>(
    type: string, payload: P,
): IAction<P> {
    return createAction(toResetType(type), payload);
}
