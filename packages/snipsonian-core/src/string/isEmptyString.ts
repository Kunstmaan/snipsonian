import isString from '../is/isString';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function isEmptyString(val?: any): boolean {
    return (isString(val) && val.trim() === '');
}
