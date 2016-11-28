import {is} from '../index';

const addProp = (propName, propValue) =>
    function decorate(target) {
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