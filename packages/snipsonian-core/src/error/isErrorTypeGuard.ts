import isObjectPure from '../is/isObjectPure';
import isSetString from '../string/isSetString';

export function isErrorTypeGuard(error: unknown | Error): error is Error {
    if (!isObjectPure(error)) {
        return false;
    }

    return isSetString((error as Error).message);
}
