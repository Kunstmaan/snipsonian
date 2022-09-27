import isSet from '../../is/isSet';
import isObject from '../../is/isObject';

export default function isSetObject(val: unknown) {
    return isSet(val) && isObject(val);
}
