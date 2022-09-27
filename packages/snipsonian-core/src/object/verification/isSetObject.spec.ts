import isSetObject from './isSetObject';

describe('isSetObject()', () => {
    it('returns true when the input is an object', () => {
        expect(isSetObject({
            someField: 'some value',
        })).toEqual(true);
        expect(isSetObject({})).toEqual(true);

        expect(isSetObject([
            'an array is also an object',
        ])).toEqual(true);
        expect(isSetObject([])).toEqual(true);
    });

    it('returns false when the input is either null, undefined or not of type object', () => {
        expect(isSetObject(null)).toEqual(false);
        expect(isSetObject(undefined)).toEqual(false);
        expect(isSetObject('a string is not an object')).toEqual(false);
    });
});
