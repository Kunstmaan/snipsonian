import is from './is';

describe('is:', () => {
    describe('is.undefined()', () => {
        it('returns true if input undefined', () => {
            expect(is.undefined()).toEqual(true);
            expect(is.undefined(undefined)).toEqual(true);

            let varWithoutValue;
            expect(is.undefined(varWithoutValue)).toEqual(true);
        });

        it('returns false if input defined', () => {
            expect(is.undefined('')).toEqual(false);
            expect(is.undefined(0)).toEqual(false);
            expect(is.undefined([])).toEqual(false);
            expect(is.undefined({})).toEqual(false);
            expect(is.undefined(null)).toEqual(false);
            expect(is.undefined(() => {})).toEqual(false);
        });
    });

    describe('is.null()', () => {
        it('returns true if input null', () => {
            expect(is.null(null)).toEqual(true);

            const nullVar = null;
            expect(is.null(nullVar)).toEqual(true);
        });

        it('returns false if input not null', () => {
            expect(is.null('')).toEqual(false);
            expect(is.null(0)).toEqual(false);
            expect(is.null([])).toEqual(false);
            expect(is.null({})).toEqual(false);

            expect(is.null(undefined)).toEqual(false);
        });
    });
});