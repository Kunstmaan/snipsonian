import isSet from './isSet';
import isObject from './isObject';
import isFunction from './isFunction';

export default function isPromise<PromiseResult>(
    input: Promise<PromiseResult> | unknown,
): input is Promise<PromiseResult> {
    return isSet(input)
        && isObject(input)
        && isFunction((input as unknown as Promise<PromiseResult>).then);
}
