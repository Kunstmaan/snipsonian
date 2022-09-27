import isUndefined from './isUndefined';
import isNull from './isNull';

export default function isSet(val: unknown): boolean {
    return !isUndefined(val) && !isNull(val);
}
