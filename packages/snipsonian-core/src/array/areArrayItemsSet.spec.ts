import areArrayItemsSet from './areArrayItemsSet';

describe('areArrayItemsSet()', () => {
    it('returns true if all elements of the array are set and the array has at least one element', () => {
        expect(areArrayItemsSet([3, 5])).toBeTruthy();
        expect(areArrayItemsSet([5, null])).toBeFalsy();
        expect(areArrayItemsSet([])).toBeFalsy();
    });
});
