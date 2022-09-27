/**
 * Returns true if the 2 input arrays have the same values
 * (where the order of those values is not important).
 */
export default function doArraysHaveSameValues(
    arrA: unknown[],
    arrB: unknown[],
): boolean {
    if (arrA.length !== arrB.length) {
        return false;
    }

    return arrA.every((itemA) => arrB.includes(itemA));
}
