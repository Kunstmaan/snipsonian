import isObject from '../../is/isObject';
import { TAnyObject } from '../../typings/object';
import getPossiblyNestedObjectPropValue from '../filtering/getPossiblyNestedObjectPropValue';

/**
 * 'fieldToUpdateRef' can be something like e.g. "parentField[0].childField".
 * This function would then update the 'childField' property of the first element of a
 * 'parentField' array (which should be a property of the input 'obj').
 */
export default function updateObjectField({
    obj,
    fieldToUpdateRef,
    val,
}: {
    obj: TAnyObject;
    fieldToUpdateRef: string;
    val: unknown;
}): TAnyObject {
    if (!isObject(obj)) {
        return obj;
    }

    const lastArraySeparator = fieldToUpdateRef.lastIndexOf('[');
    const lastObjSeparator = fieldToUpdateRef.lastIndexOf('.');

    const splitIndex = Math.max(lastArraySeparator, lastObjSeparator);

    if (splitIndex === -1) {
        // eslint-disable-next-line no-param-reassign
        obj[fieldToUpdateRef] = val;
        return obj;
    }

    const parentRef = fieldToUpdateRef.substring(0, splitIndex);
    const remainingRef = fieldToUpdateRef.substring(splitIndex + 1);
    const childKey = (splitIndex === lastArraySeparator)
        ? remainingRef.substring(0, remainingRef.indexOf(']'))
        : remainingRef;

    const getFieldsFromParentRefRegex = /([^.[\]]+)/g;
    const pathParts = parentRef.match(getFieldsFromParentRefRegex);
    const parent = getPossiblyNestedObjectPropValue(obj, ...pathParts) as TAnyObject;

    parent[childKey] = val;

    return obj;
}
