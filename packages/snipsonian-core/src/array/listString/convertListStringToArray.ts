import isSetString from '../../string/isSetString';

export const DEFAULT_LIST_STRING_SEPARATOR = ',';

export interface IConvertListStringToArrayOptions {
    itemSeparator?: string;
}

export default function convertListStringToArray<Item extends string = string>(
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
