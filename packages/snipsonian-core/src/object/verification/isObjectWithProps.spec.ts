import isObjectWithProps from './isObjectWithProps';

describe('isObjectWithProps()', () => {
    it('returns only true if the input is an object with at least 1 property', () => {
        expect(isObjectWithProps({ someProp: false })).toEqual(true);
        expect(isObjectWithProps({ a: 1, b: 'xyz' })).toEqual(true);

        expect(isObjectWithProps({})).toEqual(false);
        expect(isObjectWithProps(undefined)).toEqual(false);
        expect(isObjectWithProps(null)).toEqual(false);
        expect(isObjectWithProps([])).toEqual(false);
        expect(isObjectWithProps('str')).toEqual(false);
    });
});
