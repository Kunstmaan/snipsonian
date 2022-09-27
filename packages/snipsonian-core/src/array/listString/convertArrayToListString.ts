import { DEFAULT_LIST_STRING_SEPARATOR, IConvertListStringToArrayOptions } from './convertListStringToArray';
import isArrayWithValues from '../verification/isArrayWithValues';

export default function convertArrayToListString(
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
