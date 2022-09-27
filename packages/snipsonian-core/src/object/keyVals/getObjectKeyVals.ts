import { TAnyObject } from '../../typings/object';
import { IKeyValuePair } from '../../typings/patterns';

export default function getObjectKeyVals<Value = unknown>(obj: TAnyObject<Value>): IKeyValuePair<Value>[] {
    return Object.keys(obj)
        .map((key) => ({
            key,
            value: obj[key],
        }));
}
