import isSet from '../is/isSet';
import isString from '../is/isString';
import isEmptyString from './isEmptyString';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function isSetString(val?: any): boolean {
    return isSet(val) && isString(val) && !isEmptyString(val);
}
