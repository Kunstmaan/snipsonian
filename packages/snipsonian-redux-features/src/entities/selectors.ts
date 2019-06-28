import { ITraceableApiErrorBase } from '@snipsonian/core/src/typings/apiErrors';
import { IBaseEntitiesReducerState, IEntity, IAsyncEntity } from './types';
import { getEntitiesReducerKey } from './reducerBuildingBlocks';

export function getReducerState<EntitiesReducerState extends IBaseEntitiesReducerState>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state: any,
): EntitiesReducerState {
    return state[getEntitiesReducerKey()] as EntitiesReducerState;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getEntity<Data>(state: any, entityKey: string): IEntity<Data> {
    return getReducerState<IBaseEntitiesReducerState>(state)[entityKey];
}

export function getAsyncEntity<Data, Error = ITraceableApiErrorBase<{}>>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state: any, entityKey: string,
): IAsyncEntity<Data, Error> {
    return getEntity<Data>(state, entityKey) as IAsyncEntity<Data, Error>;
}
