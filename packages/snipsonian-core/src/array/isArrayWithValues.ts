import isArray from '../is/isArray';

export default function isArrayWithValues(arr: unknown[]): boolean {
    return isArray(arr) && arr.length > 0;
}
