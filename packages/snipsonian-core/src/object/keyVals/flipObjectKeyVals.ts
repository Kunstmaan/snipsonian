/**
 * E.g. input object { abc: 'def' } will result in { def: 'abc' }
 */
export default function flipObjectKeyVals<Key extends string = string, Val extends string = string>(
    obj: Record<Key, Val>,
): Record<Val, Key> {
    return Object.entries<Val>(obj).reduce(
        (accumulator, [key, val]) => {
            accumulator[val] = key as Key;
            return accumulator;
        },
        {} as Record<Val, Key>,
    );
}
