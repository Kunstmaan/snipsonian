import {is, assert} from '../index';

const addProp = (propName, propValue) =>
    function decorate(target) {
        assert(propName, is.set, 'Required input argument \'propName\' is missing.');

        if (is.array(target)) {
            return target.map((entity) => enrichWithProp(entity, propName, propValue));
        }

        return enrichWithProp(target, propName, propValue);
    };

export default addProp;

/* eslint no-param-reassign: ["error", { "props": false }] */
function enrichWithProp(target, propName, propValue) {
    target[propName] = propValue;

    return target;
}