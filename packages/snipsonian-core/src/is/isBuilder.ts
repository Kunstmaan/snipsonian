import isSet from './isSet';
import isFunction from './isFunction';

export default function isBuilder(val: unknown): boolean {
    return isSet(val) && isFunction((val as { build: unknown }).build);
}
