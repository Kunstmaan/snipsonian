import isSet from './isSet';
import isObject from './isObject';

export default function isDate(input: Date | unknown): input is Date {
    return isSet(input) && isObject(input) && Object.prototype.toString.call(input) === '[object Date]';
}
