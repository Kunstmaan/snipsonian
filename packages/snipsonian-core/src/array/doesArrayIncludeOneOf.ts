export default function doesArrayIncludeOneOf<Item = string>(
    arr: Item[],
    ...candidates: Item[]
) {
    if (!arr || !candidates) {
        return false;
    }

    return arr.some((item) => candidates.includes(item));
}
