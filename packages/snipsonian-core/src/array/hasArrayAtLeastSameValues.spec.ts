import hasArrayAtLeastSameValues from './hasArrayAtLeastSameValues';

describe('hasArrayAtLeastSameValues()', () => {
    // eslint-disable-next-line max-len
    it('returns true if the first input array at least has the same values as the second one (order does not matter)', () => {
        const arrayOne = [3, 'test', 67];
        const arrayTwo = [67, 3, 'test'];
        const arrayThree = ['test', 3];
        const arrayFour = ['3', '67', 'test'];

        expect(hasArrayAtLeastSameValues(arrayOne, arrayTwo)).toBeTruthy();
        expect(hasArrayAtLeastSameValues(arrayTwo, arrayThree)).toBeTruthy();
        expect(hasArrayAtLeastSameValues(arrayThree, arrayTwo)).toBeFalsy();
        expect(hasArrayAtLeastSameValues(arrayFour, arrayThree)).toBeFalsy();
    });
});
