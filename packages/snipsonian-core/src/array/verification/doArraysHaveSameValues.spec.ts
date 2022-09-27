import doArraysHaveSameValues from './doArraysHaveSameValues';

describe('doArraysHaveSameValues()', () => {
    it('returns true if the 2 input arrays have the same values (order does not matter)', () => {
        const arrayOne = [3, 'test', 67];
        const arrayTwo = [67, 3, 'test'];
        const arrayThree = ['test', 3];
        const arrayFour = ['3', '67', 'test'];

        expect(doArraysHaveSameValues(arrayOne, arrayTwo)).toBeTruthy();
        expect(doArraysHaveSameValues(arrayOne, arrayThree)).toBeFalsy();
        expect(doArraysHaveSameValues(arrayTwo, arrayFour)).toBeFalsy();
    });
});
