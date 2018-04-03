import getUrl from './getUrl';

describe('getUrl()', () => {
    it('should get the browser window"s url', () => {
        const EMPTY_URL = 'blank';
        expect(getUrl()).toBe(EMPTY_URL);
    });
});
