import isSet from './isSet';
import isFunction from './isFunction';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function isBuilder(val?: any): boolean {
    return isSet(val) && isFunction(val.build);
}
