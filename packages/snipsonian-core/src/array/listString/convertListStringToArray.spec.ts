import convertListStringToArray from './convertListStringToArray';

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
