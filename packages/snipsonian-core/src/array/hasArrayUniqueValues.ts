import isString from '../is/isString';

interface IHasArrayUniqueValuesOptions<Item = string> {
    itemMapper?: (item: Item) => string | number | boolean;
    ignoreCase?: boolean; // default true
}

export default function hasArrayUniqueValues<Item = string>(
    arr: Item[],
    options: IHasArrayUniqueValuesOptions<Item> = {},
): boolean {
    const {
        itemMapper = (item: Item): string | number | boolean => (item as unknown as string),
        ignoreCase = true,
    } = options;

    const enhancedItemMapper = ignoreCase
        ? (item: Item): string | number | boolean => {
            const temp = itemMapper(item);
            return isString(temp) ? temp.toLowerCase() : temp;
        }
        : itemMapper;

    return arr.length === new Set(arr.map(enhancedItemMapper)).size;
}
