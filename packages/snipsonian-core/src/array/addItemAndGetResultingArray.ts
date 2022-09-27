import getArrayCopy from './getArrayCopy';

export interface IAddOrRemoveItemsFromArrayCommonOptions {
    resultInNewArray?: boolean;
    addIfAlreadyPresent?: boolean; // default true
}

export default function addItemAndGetResultingArray<Item = unknown>(
    arr: Item[],
    itemToAdd: Item,
    {
        resultInNewArray = false,
        addIfAlreadyPresent = true,
    }: IAddOrRemoveItemsFromArrayCommonOptions = {},
): Item[] {
    const resultArray = resultInNewArray
        ? getArrayCopy<Item>(arr)
        : arr || [];

    if (addIfAlreadyPresent || !resultArray.includes(itemToAdd)) {
        resultArray.push(itemToAdd);
    }

    return resultArray;
}
