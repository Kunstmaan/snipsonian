import { TAnyObject } from '../typings/object';

export default function isObject<Obj = TAnyObject>(input: Obj | unknown): input is Obj {
    return typeof input === 'object';
}
