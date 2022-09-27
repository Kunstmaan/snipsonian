export default function isString(input: string | unknown): input is string {
    return typeof input === 'string';
}
