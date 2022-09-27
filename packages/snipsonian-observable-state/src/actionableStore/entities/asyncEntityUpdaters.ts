import { ITraceableApiErrorBase } from '@snipsonian/core/src/typings/apiErrors';
import {
    AsyncOperation,
    AsyncStatus,
    IAsyncEntity,
    IAsyncEntityUpdaters,
} from './types';

export const asyncEntityFetch = initAsyncEntityUpdaters(AsyncOperation.fetch);
export const asyncEntityCreate = initAsyncEntityUpdaters(AsyncOperation.create);
export const asyncEntityUpdate = initAsyncEntityUpdaters(AsyncOperation.update);
export const asyncEntityRemove = initAsyncEntityUpdaters(AsyncOperation.remove);

export const ASYNC_OPERATION_2_ASYNC_ENTITY_UPDATERS = {
    [AsyncOperation.fetch]: asyncEntityFetch,
    [AsyncOperation.create]: asyncEntityCreate,
    [AsyncOperation.update]: asyncEntityUpdate,
    [AsyncOperation.remove]: asyncEntityRemove,
};

// eslint-disable-next-line @typescript-eslint/ban-types
export function initAsyncEntityUpdaters<Data, Error = ITraceableApiErrorBase<{}>>(
    operation: AsyncOperation,
): IAsyncEntityUpdaters<Data, Error> {
    return {
        trigger(
            entity: IAsyncEntity<Data, Error>,
            initialData: Data,
        ): IAsyncEntity<Data, Error> {
            return {
                ...entity,
                data: initialData,
                [operation]: {
                    status: AsyncStatus.Busy,
                    error: null,
                },
            };
        },
        triggerWithoutDataReset(
            entity: IAsyncEntity<Data, Error>,
        ): IAsyncEntity<Data, Error> {
            return {
                ...entity,
                [operation]: {
                    status: AsyncStatus.Busy,
                    error: null,
                },
            };
        },
        succeeded(
            entity: IAsyncEntity<Data, Error>,
            data: Data,
        ): IAsyncEntity<Data, Error> {
            return {
                ...entity,
                data,
                [operation]: {
                    status: AsyncStatus.Success,
                    error: null,
                },
            };
        },
        succeededWithoutDataSet(
            entity: IAsyncEntity<Data, Error>,
        ): IAsyncEntity<Data, Error> {
            return {
                ...entity,
                [operation]: {
                    status: AsyncStatus.Success,
                    error: null,
                },
            };
        },
        failed(
            entity: IAsyncEntity<Data, Error>,
            error: Error,
        ): IAsyncEntity<Data, Error> {
            return {
                ...entity,
                [operation]: {
                    status: AsyncStatus.Error,
                    error,
                },
            };
        },
        cancel(
            entity: IAsyncEntity<Data, Error>,
        ): IAsyncEntity<Data, Error> {
            return {
                ...entity,
                [operation]: {
                    ...entity[operation],
                    status: AsyncStatus.Initial,
                },
            };
        },
        reset(
            entity: IAsyncEntity<Data, Error>,
            initialData: Data,
        ): IAsyncEntity<Data, Error> {
            return {
                ...entity,
                data: initialData,
                [operation]: {
                    status: AsyncStatus.Initial,
                    error: null,
                },
            };
        },
        resetWithoutDataReset(
            entity: IAsyncEntity<Data, Error>,
        ): IAsyncEntity<Data, Error> {
            return {
                ...entity,
                [operation]: {
                    status: AsyncStatus.Initial,
                    error: null,
                },
            };
        },
    };
}
