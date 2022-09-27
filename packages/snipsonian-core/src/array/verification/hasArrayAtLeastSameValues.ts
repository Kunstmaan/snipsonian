/**
 * Returns true if the first input array has at least the same values of the second array
 * (where the order of those values is not important).
 * So no problem when the first array has extra items opposed to the second.
 */
export default function hasArrayAtLeastSameValues(
    arrA: unknown[],
    arrB: unknown[],
): boolean {
    if (arrA.length < arrB.length) {
        return false;
    }

    return arrB.every((itemB) => arrA.includes(itemB));
}
