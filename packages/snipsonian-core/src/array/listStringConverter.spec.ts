import { convertArrayToListString, convertListStringToArray } from './listStringConverter';

describe('listStringConverter:', () => {
    describe('convertListStringToArray()', () => {
        it('converts a comma-separated list string to an array (but the separator can be overruled)', () => {
            const listItemOne = 'testItem';
            const listItemTwo = 'otherItem';

            expect(convertListStringToArray(undefined)).toEqual(null);

            expect(convertListStringToArray(`${listItemOne},${listItemTwo}`)).toEqual([listItemOne, listItemTwo]);
            expect(convertListStringToArray(
                `${listItemOne}.${listItemTwo}`,
                { itemSeparator: '.' },
            )).toEqual([listItemOne, listItemTwo]);
        });
    });

    describe('convertArrayToListString()', () => {
        it('converts an array to a comma-separated list string (but the separator can be overruled)', () => {
            const listItemOne = 'testItem';
            const listItemTwo = 'otherItem';
            const testArray = [listItemOne, listItemTwo];

            expect(convertArrayToListString([])).toEqual(null);

            expect(convertArrayToListString(testArray)).toEqual(`${listItemOne},${listItemTwo}`);
            expect(convertArrayToListString(
                testArray,
                { itemSeparator: '.' },
            )).toEqual(`${listItemOne}.${listItemTwo}`);
        });
    });
});
