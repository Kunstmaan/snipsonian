import getUrlPartBetween from './getUrlPartBetween';

describe('getURlPartBetween()', () => {
    it('returns undefined when no url is given', () => {
        expect(getUrlPartBetween({ firstPart: 'doc/' })).toBe(undefined);
    });

    it('returns the part (of the input url) between first- and secondPart', () => {
        expect(getUrlPartBetween({
            firstPart: 'doc/',
            secondPart: '/#generic',
            url: 'http://0.0.0.0:8000/doc/latest/#generic',
        })).toBe('latest');
    });

    it('takes by default / as the secondPart', () => {
        expect(getUrlPartBetween({ firstPart: 'doc/', url: 'http://0.0.0.0:8000/doc/latest/' })).toBe('latest');
    });
});
