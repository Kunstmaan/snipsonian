import isArray from '../is/isArray';

export default function ensureArray<Item = unknown>(input: Item | Item[]): Item[] {
    if (isArray<Item>(input)) {
        return input;
    }

    return [input];
}
