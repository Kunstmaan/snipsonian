import getUrlPath from './getUrlPath';

describe('getUrlPath()', () => {
    it('should get the browser window"s url path = part after the hostname', () => {
        // see 'testURL' in jest.config.js
        expect(getUrlPath()).toBe('/some/path');
    });
});
