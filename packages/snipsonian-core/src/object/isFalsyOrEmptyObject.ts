import isEmptyObject from './isEmptyObject';

export function isFalsyOrEmptyObject(obj: object): boolean {
    if (!obj) {
        return true;
    }
    return isEmptyObject(obj);
}
