import getPartBetween from './getPartBetween';

describe('getPartBetween()', () => {
    it('returns undefined when no input is given', () => {
        expect(getPartBetween({ firstPart: 'doc/', input: undefined, secondPart: 'file/' })).toBe(undefined);
    });

    it('returns the part (of the input) between first- and secondPart', () => {
        expect(getPartBetween({
            firstPart: '/parent/',
            secondPart: '/filename.js',
            input: '/parent/folder/structure/filename.js',
        })).toBe('folder/structure');
    });

    it('no issue when the firstPart occurs multiple times in the input', () => {
        expect(getPartBetween({
            firstPart: '/',
            secondPart: '/filename.js',
            input: '/parent/folder/structure/filename.js',
        })).toBe('parent/folder/structure');
    });
});
