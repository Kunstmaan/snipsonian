import isObject from './isObject';
import isArray from './isArray';
import isNull from './isNull';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function isObjectPure(val?: any): boolean {
    return isObject(val) && !isArray(val) && !isNull(val);
}
