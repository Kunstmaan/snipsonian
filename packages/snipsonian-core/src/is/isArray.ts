export default function isArray<ArrayItem = unknown>(input: ArrayItem[] | unknown): input is ArrayItem[] {
    return Array.isArray(input);
}
