import addItemAndGetResultingArray from './addItemAndGetResultingArray';

describe('addItemAndGetResultingArray()', () => {
    it('adds items to the input array, optionally resulting in a new array', () => {
        const inputArray: string[] = [];

        const actualNewArray = addItemAndGetResultingArray(
            inputArray,
            'itemOne',
            { resultInNewArray: true },
        );

        expect(actualNewArray).toEqual(['itemOne']);

        const actualSameArray = addItemAndGetResultingArray(
            inputArray,
            'itemTwo',
        );

        expect(actualSameArray).toEqual(inputArray);
        expect(actualSameArray).toEqual(['itemTwo']);
    });
});
