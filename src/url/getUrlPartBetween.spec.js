import getUrlPartBetween from './getUrlPartBetween';

describe('getURlPartBetween()', () => {
    describe('when location.pathname is not set', () => {
        it('and "doc/" is requested', () => {
            expect(getUrlPartBetween({firstPart: 'doc/'})).toBe(undefined);
        });

        it('and url is given', () => {
            expect(getUrlPartBetween({firstPart: 'doc/', url: 'http://0.0.0.0:8000/doc/latest/'})).toBe('latest');
        });

        it('and url and secondPart is given', () => {
            expect(getUrlPartBetween({
                firstPart: 'doc/',
                secondPart: '/#generic',
                url: 'http://0.0.0.0:8000/doc/latest/#generic'
            })).toBe('latest');
        });
    });

    describe('when location.pathname is set', () => {
        it('when secondPart is not given', () => {
            Object.defineProperty(window.location, 'pathname', {
                value: '/doc/latest/',
                configurable: true
            });

            expect(getUrlPartBetween({firstPart: 'doc/'})).toBe('latest');
        });

        it('when secondPart is given', () => {
            Object.defineProperty(window.location, 'pathname', {
                value: '/doc/latest/#generic'
            });

            expect(getUrlPartBetween({firstPart: 'doc/', secondPart: '/#generic'})).toBe('latest');
        });
    });
});