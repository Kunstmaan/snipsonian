export default function getFirstItemOfArray<Item = unknown>(arr: Item[]): Item {
    if (arr && arr.length > 0) {
        return arr[0];
    }

    return null;
}
