import appendUrlParamIfNotAlready from './appendUrlParamIfNotAlready';

describe('appendUrlParamIfNotAlready()', () => {
    it('correct encodes new params and values inside a url', () => {
        const url = appendUrlParamIfNotAlready({
            url: '/api',
            paramName: '??&&',
            paramValue: '??&&',
        });

        expect(url).toBe('/api?%3F%3F%26%26=%3F%3F%26%26');
    });

    it('returns the url if trying to append params that are already in the url', () => {
        const url = appendUrlParamIfNotAlready({
            url: '/api?%3F%3F%26%26=%3F%3F%26%26',
            paramName: '??&&',
            paramValue: '??&&',
        });

        expect(url).toBe('/api?%3F%3F%26%26=%3F%3F%26%26');
    });
});
