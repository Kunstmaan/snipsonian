import {is} from './is';

/**
 * Merges the properties of two or more input objects deeply, returning a new object with the properties of all
 * source objects.
 * If a property is present in multiple source objects, the value from the last inputted source will take precedence.
 */
export default function mergeObjectPropsDeeply(...sources) {
    const initialValue = {};

    return sources.reduce(
        (accumulator, source) => mergeObjectPropsDeeplyFromSourceToTarget({
            target: accumulator,
            source
        }),
        initialValue
    );
}

function mergeObjectPropsDeeplyFromSourceToTarget({target, source}) {
    if (is.objectPure(target) && is.objectPure(source)) {
        Object.keys(source).forEach((key) => {
            if (is.objectPure(source[key])) {
                if (!(key in target)) {
                    Object.assign(target, {[key]: source[key]});
                } else {
                    // eslint-disable-next-line no-param-reassign
                    target[key] = mergeObjectPropsDeeplyFromSourceToTarget({
                        target: target[key],
                        source: source[key]
                    });
                }
            } else {
                Object.assign(target, {[key]: source[key]});
            }
        });
    }

    return target;
}