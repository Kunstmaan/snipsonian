import { AsyncOperation, AsyncStatus, IAsyncEntity } from './types';

export const asyncOperationList: string[] = Object.values(AsyncOperation);

export function isValidAsyncOperation(possibleOperation: string): boolean {
    return asyncOperationList.indexOf(possibleOperation) !== -1;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function isAnyAsyncOperationBusy(asyncEntity: IAsyncEntity<any>): boolean {
    return Object.values(AsyncOperation)
        .some((operation) => isAsyncOperationBusy(asyncEntity, operation));
}

export function isFetchBusy(asyncEntity: IAsyncEntity<any>): boolean {
    return isAsyncOperationBusy(asyncEntity, AsyncOperation.fetch);
}

export function isUpdateBusy(asyncEntity: IAsyncEntity<any>): boolean {
    return isAsyncOperationBusy(asyncEntity, AsyncOperation.update);
}

export function isAsyncOperationBusy(asyncEntity: IAsyncEntity<any>, operation: AsyncOperation): boolean {
    return hasAsyncOperationExpectedStatus(asyncEntity, operation, AsyncStatus.Busy);
}

export function hasFetchSucceeded(asyncEntity: IAsyncEntity<any>): boolean {
    return hasAsyncOperationSucceeded(asyncEntity, AsyncOperation.fetch);
}

export function hasFetchFailed(asyncEntity: IAsyncEntity<any>): boolean {
    return hasAsyncOperationFailed(asyncEntity, AsyncOperation.fetch);
}

export function hasAsyncOperationSucceeded(asyncEntity: IAsyncEntity<any>, operation: AsyncOperation): boolean {
    return hasAsyncOperationExpectedStatus(asyncEntity, operation, AsyncStatus.Success);
}

export function hasAsyncOperationFailed(asyncEntity: IAsyncEntity<any>, operation: AsyncOperation): boolean {
    return hasAsyncOperationExpectedStatus(asyncEntity, operation, AsyncStatus.Error);
}

function hasAsyncOperationExpectedStatus(
    asyncEntity: IAsyncEntity<any>,
    operation: AsyncOperation,
    status: AsyncStatus,
): boolean {
    return asyncEntity[operation] && (asyncEntity[operation].status === status);
}

/* eslint-enable @typescript-eslint/no-explicit-any */
