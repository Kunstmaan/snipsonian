import isUndefined from '../is/isUndefined';
import isNull from '../is/isNull';
import isObjectPure from '../is/isObjectPure';
import cloneObjectDataProps from '../object/cloneObjectDataProps';

interface IMergeObjectPropsDeeplyOptions {
    ignoreUndefinedSourceProps?: boolean; /* default true */
    ignoreNullSourceProps?: boolean; /* default true */
    ignoreDifferentTypeSourceProps?: boolean; /* default true */
}

/**
 * Merges the properties of two or more input objects deeply, returning a new object with the properties of all
 * source objects.
 *
 * If a property is present in multiple source objects, the value from the last inputted source will take precedence.
 * So the first source that is provided as input, is considered the "target" object.
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
 *
 * p.s.
 * - some of the above behaviour can we tweaked by passing some options
 * - properties containing a function will not end up in the resulting object!
 */
export default function mergeObjectPropsDeeply(...sources: object[]): object {
    return mergeObjectPropsDeeplyOptionable({
        sources,
    });
}

export function mergeObjectPropsDeeplyOptionable({
    options,
    sources,
}: {
    options?: IMergeObjectPropsDeeplyOptions;
    sources: object[];
}): object {
    const initialValue = {};

    return sources.reduce(
        (accumulator, source, index) => {
            if (index === 0) {
                return cloneObjectDataProps(source);
            }

            return mergeObjectPropsDeeplyFromSourceToTarget({
                target: accumulator,
                source,
                options,
            });
        },
        initialValue,
    );
}

export function mergeObjectPropsDeeplyFromSourceToTarget({
    target,
    source,
    options,
}: {
    target: object;
    source: object;
    options?: IMergeObjectPropsDeeplyOptions;
}): object {
    const {
        ignoreUndefinedSourceProps = true,
        ignoreNullSourceProps = true,
        ignoreDifferentTypeSourceProps = true,
    } = options || {};

    if (isUndefined(target) || isNull(target)) {
        return cloneProp(source);
    }

    if (isUndefined(source)) {
        return ignoreUndefinedSourceProps ? target : cloneProp(source);
    }

    if (isNull(source)) {
        return ignoreNullSourceProps ? target : cloneProp(source);
    }

    if ((typeof source !== typeof target)) {
        return ignoreDifferentTypeSourceProps ? target : cloneProp(source);
    }

    if (isObjectPure(target)) {
        if (isObjectPure(source)) {
            Object.keys(source).forEach((key) => {
                // eslint-disable-next-line no-param-reassign
                target[key] = mergeObjectPropsDeeplyFromSourceToTarget({
                    target: target[key] as object,
                    source: source[key] as object,
                    options,
                });
            });

            return target;
        }

        /* source is not a pure object like the target is but did still have the same type,
           so it is an array. */
        return ignoreDifferentTypeSourceProps ? target : cloneProp(source);
    }

    return cloneProp(source);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cloneProp(prop: any): any {
    if (isUndefined(prop) || isNull(prop)) {
        return prop;
    }

    if (isObjectPure(prop)) {
        return cloneObjectDataProps(prop);
    }

    // eslint-disable-next-line @typescript-eslint/dot-notation
    return cloneObjectDataProps({ temp: prop })['temp'];
}
