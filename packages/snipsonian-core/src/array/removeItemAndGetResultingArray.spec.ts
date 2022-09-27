import removeItemAndGetResultingArray from './removeItemAndGetResultingArray';

describe('removeItemAndGetResultingArray()', () => {
    it('removes items from the input array, optionally resulting in a new array', () => {
        expect(removeItemAndGetResultingArray(
            ['test', 3, 67],
            'test',
        )).toEqual([3, 67]);

        expect(removeItemAndGetResultingArray(
            [2, 3, 1, 4],
            3,
        )).toEqual([2, 1, 4]);
    });
});
