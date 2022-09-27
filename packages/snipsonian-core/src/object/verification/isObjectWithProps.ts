import isObjectPure from '../../is/isObjectPure';
import isEmptyObject from './isEmptyObject';

export default function isObjectWithProps(val: unknown): boolean {
    return isObjectPure(val) && !isEmptyObject(val);
}
