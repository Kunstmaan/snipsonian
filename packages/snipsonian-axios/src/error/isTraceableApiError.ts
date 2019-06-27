import { ITraceableApiErrorBase } from '@snipsonian/core/src/typings/apiErrors';
import isNumber from '@snipsonian/core/src/is/isNumber';
import isString from '@snipsonian/core/src/is/isString';
import isObjectPure from '@snipsonian/core/src/is/isObjectPure';
import { TRACEABLE_API_ERROR_ID_PREFIX } from './generateTraceableApiErrorId';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function isTraceableApiError(error: any): error is ITraceableApiErrorBase<{}> {
    if (!isObjectPure(error)) {
        return false;
    }

    const traceableAPiError = error as ITraceableApiErrorBase<{}>;

    return (
        traceableAPiError &&
        isNumber(traceableAPiError.status) &&
        isString(traceableAPiError.traceableId) &&
        traceableAPiError.traceableId.indexOf(TRACEABLE_API_ERROR_ID_PREFIX) === 0
    );
}
