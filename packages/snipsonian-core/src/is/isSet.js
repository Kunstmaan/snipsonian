import isUndefined from './isUndefined';
import isNull from './isNull';

export default function isSet(val) {
    return !isUndefined(val) && !isNull(val);
}
