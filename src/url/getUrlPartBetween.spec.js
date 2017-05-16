import getUrlPartBetween from './getUrlPartBetween';

describe('getURlPartBetween', () => {
    it('when no pathname is set and "doc/" is requested', () => {
        expect(getUrlPartBetween({firstPart: 'doc/'})).toBe(undefined);
    });

    it('when no pathname is set and url is given', () => {
        expect(getUrlPartBetween({firstPart: 'doc/', url: 'http://0.0.0.0:8000/doc/latest/'})).toBe('latest');
    });

    it('when no pathname is set and url and secondPart is given', () => {
        expect(getUrlPartBetween({
            firstPart: 'doc/',
            secondPart: '/#generic',
            url: 'http://0.0.0.0:8000/doc/latest/#generic'
        })).toBe('latest');
    });

    it('when pathname is set', () => {
        Object.defineProperty(window.location, 'pathname', {
            value: '/doc/latest/',
            configurable: true
        });

        expect(getUrlPartBetween({firstPart: 'doc/'})).toBe('latest');
    });

    it('when pathname and secondPart is set', () => {
        Object.defineProperty(window.location, 'pathname', {
            value: '/doc/latest/#generic'
        });

        expect(getUrlPartBetween({firstPart: 'doc/', secondPart: '/#generic'})).toBe('latest');
    });
});