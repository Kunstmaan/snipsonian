import { TAnyObject } from '../typings/object';

export default function getUniqueArrayValues<Item = string | number>(
    arr: Item[],
    {
        takeFirstValue = true,
    }: {
        takeFirstValue?: boolean;
    } = {},
): Item[] {
    if (!arr) {
        return [];
    }

    const uniqueObj = arr.reduce(
        (accumulator, item) => {
            const key = `${item}`;
            if (!accumulator[key] || !takeFirstValue) {
                accumulator[key] = item;
            }
            return accumulator;
        },
        {} as TAnyObject<Item>,
    );

    return Object.values(uniqueObj);
}
