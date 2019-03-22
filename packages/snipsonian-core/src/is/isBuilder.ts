import isSet from './isSet';
import isFunction from './isFunction';

export default function isBuilder(val?: any) {
    return isSet(val) && isFunction(val.build);
}
