export default function isNumber(input: number | unknown): input is number {
    return typeof input === 'number' && !Number.isNaN(input);
}
