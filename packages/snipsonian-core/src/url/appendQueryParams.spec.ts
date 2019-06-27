import appendQueryParams from './appendQueryParams';

describe('appendQueryParams():', () => {
    const url = 'http://some.domain.be';

    it('just returns the url if no params provided', () => {
        const actual = appendQueryParams({
            url,
        });

        expect(actual).toEqual('http://some.domain.be');
    });

    it('just returns the url if empty params provided', () => {
        const actual = appendQueryParams({
            url,
            params: {},
        });

        expect(actual).toEqual('http://some.domain.be');
    });

    it('appends the provided params correctly to the url', () => {
        const actual = appendQueryParams({
            url,
            params: {
                first: 123,
                second: 'blabla',
            },
        });

        expect(actual).toEqual('http://some.domain.be?first=123&second=blabla');
    });

    it('no problem if the url already contained a query param', () => {
        const actual = appendQueryParams({
            url: `${url}?already=777`,
            params: {
                first: 123,
                second: 'blabla',
            },
        });

        expect(actual).toEqual('http://some.domain.be?already=777&first=123&second=blabla');
    });

    it('string query params are encoded automatically', () => {
        const actual = appendQueryParams({
            url,
            params: {
                first: 123,
                second: 'bla bla',
            },
        });

        expect(actual).toEqual('http://some.domain.be?first=123&second=bla%20bla');
    });
});
