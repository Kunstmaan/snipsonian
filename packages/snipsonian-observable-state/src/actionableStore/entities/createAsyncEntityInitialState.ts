import isSet from '@snipsonian/core/src/is/isSet';
import { ITraceableApiErrorBase } from '@snipsonian/core/src/typings/apiErrors';
import { TAnyObject } from '@snipsonian/core/src/typings/object';
import { AsyncOperation, AsyncStatus, IAsyncEntity } from './types';

// eslint-disable-next-line @typescript-eslint/ban-types
export function createAsyncEntityInitialState<Data = TAnyObject, Error = ITraceableApiErrorBase<{}>>({
    data,
    operations = [AsyncOperation.fetch],
}: {
    data?: Data;
    operations?: AsyncOperation[];
} = {}): IAsyncEntity<Data, Error> {
    const baseEntity: IAsyncEntity<Data, Error> = {
        data: isSet(data) ? data : null,
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
