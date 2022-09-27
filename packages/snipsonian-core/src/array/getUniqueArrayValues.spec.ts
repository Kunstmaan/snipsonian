import getUniqueArrayValues from './getUniqueArrayValues';

describe('getUniqueArrayValues()', () => {
    it('extracts the unique values of the input array', () => {
        expect(getUniqueArrayValues([3, 3, 3])).toEqual([3]);
        expect(getUniqueArrayValues([1, 2, 3])).toEqual([1, 2, 3]);
        expect(getUniqueArrayValues(['test', 3, 67])).toEqual([3, 67, 'test']);
    });
});
