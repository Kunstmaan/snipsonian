const IS_INTEGER_REGEX = /^[0-9]+$/;

export default function isInteger(input: number | unknown): input is number {
    return IS_INTEGER_REGEX.test(input?.toString());
}
