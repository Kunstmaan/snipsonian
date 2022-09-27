import { IAddOrRemoveItemsFromArrayCommonOptions } from './addItemAndGetResultingArray';
import removeItemByIndexAndGetResultingArray from './removeItemByIndexAndGetResultingArray';

export default function removeItemAndGetResultingArray<Item = unknown>(
    arr: Item[],
    itemToRemove: Item,
    {
        resultInNewArray = false,
        isItemToRemovePredicate = (existingItem): boolean => existingItem === itemToRemove,
    }: IAddOrRemoveItemsFromArrayCommonOptions & {
        isItemToRemovePredicate?: (existingItem: Item) => boolean;
    } = {},
): Item[] {
    if (!arr) {
        return arr;
    }

    const indexToRemove = arr.findIndex(isItemToRemovePredicate);

    return removeItemByIndexAndGetResultingArray<Item>(arr, indexToRemove, { resultInNewArray });
}
