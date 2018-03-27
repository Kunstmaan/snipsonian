import isUndefined from './isUndefined';
import isNull from './isNull';
import isSet from './isSet';
import isFunction from './isFunction';
import isBoolean from './isBoolean';
import isNumber from './isNumber';
import isString from './isString';
import isArray from './isArray';
import isObject from './isObject';
import isObjectPure from './isObjectPure';
import isBuilder from './isBuilder';

export default {
    undefined: isUndefined,
    null: isNull,
    set: isSet,
    function: isFunction,
    boolean: isBoolean,
    number: isNumber,
    string: isString,
    array: isArray,
    object: isObject,
    objectPure: isObjectPure,
    builder: isBuilder
};
