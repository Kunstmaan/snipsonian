export default function getArrayCopy<Item = unknown>(arr: Item[]): Item[] {
    if (!arr) {
        return [];
    }

    return arr.slice(0);
}
