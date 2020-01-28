import { IDocumentationItem } from '../models/documentation';

export function sortDocumentationItems(items: IDocumentationItem[]) {
    const itemsWithIndexFileInFront: IDocumentationItem[] = [];

    items.forEach((item) => {
        if (item.name.startsWith('index.')) {
            itemsWithIndexFileInFront.push(item);
        }
    });
    items.forEach((item) => {
        if (!item.name.startsWith('index.')) {
            itemsWithIndexFileInFront.push(item);
        }
    });
    return itemsWithIndexFileInFront;
}
