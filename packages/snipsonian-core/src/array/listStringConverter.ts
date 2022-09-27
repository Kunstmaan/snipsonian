import isArrayWithValues from './isArrayWithValues';
import isSetString from '../string/isSetString';

export const DEFAULT_LIST_STRING_SEPARATOR = ',';

interface IConvertListStringToArrayOptions {
    itemSeparator?: string;
}

export function convertListStringToArray<Item extends string = string>(
    listString: string,
    {
        itemSeparator = DEFAULT_LIST_STRING_SEPARATOR,
    }: IConvertListStringToArrayOptions = {},
): Item[] {
    if (!isSetString(listString)) {
        return null;
    }
    return listString.split(itemSeparator) as Item[];
}

export function convertArrayToListString(
    array: string[],
    {
        itemSeparator = DEFAULT_LIST_STRING_SEPARATOR,
    }: IConvertListStringToArrayOptions = {},
): string {
    if (!isArrayWithValues(array)) {
        return null;
    }
    return array.join(itemSeparator);
}
