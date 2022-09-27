import isObject from './isObject';
import isArray from './isArray';
import isNull from './isNull';
import { TAnyObject } from '../typings/object';

export default function isObjectPure<Obj = TAnyObject>(input: Obj | unknown): input is Obj {
    return isObject(input) && !isArray(input) && !isNull(input);
}
