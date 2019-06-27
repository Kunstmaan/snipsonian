const IS_INTEGER_REGEX = /^[0-9]+$/;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function isInteger(val?: any): boolean {
    return IS_INTEGER_REGEX.test(val);
}
