import getRandomNumber from './getRandomNumber';

describe('getRandomNumber()', () => {
    it('returns a random number between the input min and max numbers', () => {
        const from0to10 = getRandomNumber({ min: 0, max: 10 });
        expect(from0to10 >= 0 && from0to10 <= 10).toBeTruthy();

        const from22to25 = getRandomNumber({ min: 22, max: 25 });
        expect(from22to25 >= 22 && from22to25 <= 25).toBeTruthy();

        const from1000to23456 = getRandomNumber({ min: 1000, max: 23456 });
        expect(from1000to23456 >= 1000 && from1000to23456 <= 23456).toBeTruthy();

        const just707 = getRandomNumber({ min: 707, max: 707 });
        expect(just707).toEqual(707);
    });

    it('throws an exception when the min valie is lower than 0', () => {
        const shouldThrowError = (): number =>
            getRandomNumber({ min: -1, max: 10 });

        expect(shouldThrowError).toThrowError('The min value should be minimal 0.');
    });
});
