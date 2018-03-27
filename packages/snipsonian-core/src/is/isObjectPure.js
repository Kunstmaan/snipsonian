import isObject from './isObject';
import isArray from './isArray';
import isNull from './isNull';

export default function isObjectPure(val) {
    return isObject(val) && !isArray(val) && !isNull(val);
}
