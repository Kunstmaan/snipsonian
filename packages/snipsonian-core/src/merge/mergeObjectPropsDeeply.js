import isUndefined from '../is/isUndefined';
import isNull from '../is/isNull';
import isObjectPure from '../is/isObjectPure';

/**
 * Merges the properties of two or more input objects deeply, returning a new object with the properties of all
 * source objects.
 *
 * If a property is present in multiple source objects, the value from the last inputted source will take precedence.
 * For example:
 *   prop of source A       prop of source B        result
 *   ----------------       ----------------        ------
 *   {a: '123', c: 7}       {a: 'z', b: 444}        {a: 'z', b: 444, c: 7}
 *
 * But if the structure of the source properties is different (e.g. string vs. object) than the first source takes
 * precedence, except if the prop of that first source is null or undefined!
 * For example:
 *   prop of source A       prop of source B        result
 *   ----------------       ----------------        ------
 *   '123' (string)         {b: 'zzz'}              '123'
 *   {a: 'abc'}             'xyz' (string)          {a: 'abc'}
 *   null                   {b: 'zzz'}              {b: 'zzz'}
 *   undefined              {b: 'zzz'}              {b: 'zzz'}
 */
export default function mergeObjectPropsDeeply(...sources) {
    const initialValue = {};

    return sources.reduce(
        (accumulator, source) => mergeObjectPropsDeeplyFromSourceToTarget({
            target: accumulator,
            source,
        }),
        initialValue,
    );
}

export function mergeObjectPropsDeeplyFromSourceToTarget({ target, source }) {
    if (isUndefined(target) || isNull(target)) {
        return source;
    }

    if (isObjectPure(target) && isObjectPure(source)) {
        Object.keys(source).forEach((key) => {
            if (isObjectPure(source[key])) {
                if (!(key in target)) {
                    Object.assign(target, { [key]: source[key] });
                } else {
                    // eslint-disable-next-line no-param-reassign
                    target[key] = mergeObjectPropsDeeplyFromSourceToTarget({
                        target: target[key],
                        source: source[key],
                    });
                }
            } else if (!isObjectPure(target[key])) {
                Object.assign(target, { [key]: source[key] });
            }
            // else (only the target is an object): target remains untouched
        });
    }

    return target;
}
