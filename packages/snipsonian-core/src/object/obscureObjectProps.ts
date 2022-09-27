import isSet from '../is/isSet';
import isObjectPure from '../is/isObjectPure';
import { TAnyObject } from '../typings/object';
import cloneObjectDataProps from './cloneObjectDataProps';

/**
 * This method will
 * - clone the input object
 * - then search for (nested) properties that match the 'propPathsToObscure'
 * - and obscure their values with the 'obscureValue'.
 *
 * @param obj The object to obscure some sensitive data from
 * @param propPathsToObscure Array of property paths to obscure, where a . is used as path delimiter.
 *                           E.g. ['headers.Authorization'] to obscure the Authorization prop within the headers prop.
 * @param obscureValue Optional (default "***obscured***"). The string that will be used to obscure a property value.
 *                     If false, then the properties will be removed from the resulting object instead of obscured.
 */

const DEFAULT_OBSCURE_VALUE = '***obscured***';

export function obscureObjectProps({
    obj,
    propPathsToObscure,
    obscureValue = DEFAULT_OBSCURE_VALUE,
}: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    obj: object;
    propPathsToObscure: string[];
    obscureValue?: false | string;
}) {
    if (!isObjectPure(obj)) {
        return obj;
    }

    return propPathsToObscure.reduce(
        (accumulator, propPathToObscure) => {
            if (isObjectPropSetByPath({
                obj: accumulator as TAnyObject,
                propPath: propPathToObscure,
            })) {
                if (obscureValue === false) {
                    removeObjectByPath({
                        obj: accumulator as TAnyObject,
                        propPath: propPathToObscure,
                    });
                } else {
                    setObjectPropByPath({
                        obj: accumulator as TAnyObject,
                        propPath: propPathToObscure,
                        newValue: obscureValue,
                    });
                }
            }

            return accumulator;
        },
        cloneObjectDataProps(obj),
    );
}

function removeObjectByPath({
    obj,
    propPath,
}: {
    obj: TAnyObject;
    propPath: string; // . separated
}) {
    const pathParts = propPath.split('.');

    if (pathParts.length === 1) {
        // eslint-disable-next-line no-param-reassign
        delete obj[pathParts[0]];
    } else if (pathParts.length > 1) {
        const lastPathPart = pathParts.pop(); /* 'pop' removes the last element of an array */

        const parentObj = getObjectPropByPathParts({
            obj,
            propPathParts: pathParts, /* does not contain the last path part anymore because of the pop */
        });

        if (isObjectPure(parentObj)) {
            delete (parentObj as TAnyObject)[lastPathPart];
        }
    }

    return obj;
}

function setObjectPropByPath({
    obj,
    propPath,
    newValue,
}: {
    obj: TAnyObject;
    propPath: string; // . separated
    newValue: unknown;
}) {
    const pathParts = propPath.split('.');

    if (pathParts.length === 1) {
        // eslint-disable-next-line no-param-reassign
        obj[pathParts[0]] = newValue;
    } else if (pathParts.length > 1) {
        const lastPathPart = pathParts.pop(); /* 'pop' removes the last element of an array */

        const parentObj = getObjectPropByPathParts({
            obj,
            propPathParts: pathParts, /* does not contain the last path part anymore because of the pop */
        });

        if (isObjectPure(parentObj)) {
            (parentObj as TAnyObject)[lastPathPart] = newValue;
        }
    }

    return obj;
}

function getObjectPropByPathParts({
    obj,
    propPathParts,
}: {
    obj: TAnyObject;
    propPathParts: string[];
}): unknown {
    if (!isObjectPure(obj)) {
        return null;
    }

    if (!propPathParts || propPathParts.length === 0) {
        return null;
    }

    const [firstPathPart, ...remainingPathParts] = propPathParts;
    const first = obj[firstPathPart];

    return propPathParts.length === 1
        ? first
        : getObjectPropByPathParts({
            obj: first as TAnyObject,
            propPathParts: remainingPathParts,
        });
}

function isObjectPropSetByPath({
    obj,
    propPath,
}: {
    obj: TAnyObject;
    propPath: string; // . separated
}): boolean {
    return isSet(
        getObjectPropByPathParts({
            obj,
            propPathParts: propPath.split('.'),
        }),
    );
}
