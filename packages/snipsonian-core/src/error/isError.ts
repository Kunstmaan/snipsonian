import isObjectPure from '../is/isObjectPure';
import isSetString from '../string/isSetString';

export default function isError(error: unknown | Error): error is Error {
    if (!isObjectPure(error)) {
        return false;
    }

    return isSetString((error as unknown as Error).message);
}
