import getUrlPartBetween from './getUrlPartBetween';

test('returns undefined', () => {
    expect(getUrlPartBetween({firstPart: 'doc/'})).toBe(undefined);
});