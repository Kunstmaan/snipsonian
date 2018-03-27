import isSet from './isSet';
import isFunction from './isFunction';

export default function isBuilder(val) {
    return isSet(val) && isFunction(val.build);
}
