import { IAddOrRemoveItemsFromArrayCommonOptions } from './addItemAndGetResultingArray';
import getArrayCopy from './getArrayCopy';

export default function removeItemByIndexAndGetResultingArray<Item = unknown>(
    arr: Item[],
    indexToRemove: number,
    {
        resultInNewArray = false,
    }: IAddOrRemoveItemsFromArrayCommonOptions = {},
): Item[] {
    if (!arr || arr.length <= indexToRemove) {
        return arr;
    }

    const resultArray = resultInNewArray
        ? getArrayCopy<Item>(arr)
        : arr;

    resultArray.splice(indexToRemove, 1);

    return resultArray;
}
