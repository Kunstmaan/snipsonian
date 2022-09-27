import isArrayWithValues from './isArrayWithValues';
import isSet from '../is/isSet';

export default function areArrayItemsSet(array: unknown[]): boolean {
    return isArrayWithValues(array) && array.every((arrayItem) => isSet(arrayItem));
}
