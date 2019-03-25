import isUndefined from './isUndefined';
import isNull from './isNull';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function isSet(val?: any): boolean {
    return !isUndefined(val) && !isNull(val);
}
