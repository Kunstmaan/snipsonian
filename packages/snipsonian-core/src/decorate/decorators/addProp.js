import assert from '../../assert';
import isSet from '../../is/isSet';
import isArray from '../../is/isArray';

export default function addProp(propName, propValue, { addIfValueUnset = true } = {}) {
    return function decorate(target) {
        assert(propName, isSet, 'Required input argument \'propName\' is missing.');

        if (isArray(target)) {
            return target.map((entity) => enrichWithProp(entity, propName, propValue, { addIfValueUnset }));
        }

        return enrichWithProp(target, propName, propValue, { addIfValueUnset });
    };
}

function enrichWithProp(target, propName, propValue, { addIfValueUnset }) {
    if (addIfValueUnset || isSet(propValue)) {
        // eslint-disable-next-line no-param-reassign
        target[propName] = propValue;
    }

    return target;
}
