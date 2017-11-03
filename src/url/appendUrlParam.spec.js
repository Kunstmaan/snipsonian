import appendUrlParam from './appendUrlParam';

describe('appendUrlParam()', () => {
    it('correctly encodes param names and values inside a url', () => {
        const url = appendUrlParam({url: '/api', paramName: '??&&', paramValue: '??&&'});
        expect(url).toBe('/api?%3F%3F%26%26=%3F%3F%26%26');
        const urlWithExtraParam = appendUrlParam({url, paramName: 'français', paramValue: 'éàè!'});
        expect(urlWithExtraParam).toBe('/api?%3F%3F%26%26=%3F%3F%26%26&fran%C3%A7ais=%C3%A9%C3%A0%C3%A8!');
    });
});