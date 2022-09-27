import convertArrayToListString from './convertArrayToListString';

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
