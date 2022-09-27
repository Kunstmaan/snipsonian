export default function isBoolean(input: boolean | unknown): input is boolean {
    return typeof input === 'boolean';
}
