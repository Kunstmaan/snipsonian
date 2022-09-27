import { TAnyObject } from '../../typings/object';
import isArray from '../../is/isArray';
import isObjectPure from '../../is/isObjectPure';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function getPossiblyNestedObjectPropValue(obj: TAnyObject, ...pathParts: string[]): any {
    if (!obj || (!isArray(obj) && !isObjectPure(obj))) {
        return null;
    }

    if (pathParts.length === 1) {
        return obj[pathParts[0]];
    }

    const [firstPathPart, ...deeperPathParts] = pathParts;

    return getPossiblyNestedObjectPropValue(
        obj[firstPathPart] as TAnyObject,
        ...deeperPathParts,
    );
}
