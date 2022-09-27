export default function getLastItemOfArray<Item = unknown>(arr: Item[]): Item {
    if (arr && arr.length > 0) {
        return arr[arr.length - 1];
    }

    return null;
}
