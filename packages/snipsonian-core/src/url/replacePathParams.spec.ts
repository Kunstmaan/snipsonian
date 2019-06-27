import replacePathParams from './replacePathParams';

describe('replacePathParams():', () => {
    const BASE_URL = 'http://some.domain.be/articles/{articleId}';

    it('just returns the url if no params provided', () => {
        const actual = replacePathParams({
            url: BASE_URL,
        });

        expect(actual).toEqual('http://some.domain.be/articles/{articleId}');
    });

    it('just returns the url if empty params provided', () => {
        const actual = replacePathParams({
            url: BASE_URL,
            params: {},
        });

        expect(actual).toEqual('http://some.domain.be/articles/{articleId}');
    });

    it('replaces a provided param correctly within the url', () => {
        const actual = replacePathParams({
            url: BASE_URL,
            params: {
                articleId: 1234,
            },
        });

        expect(actual).toEqual('http://some.domain.be/articles/1234');
    });

    it('can replace multiple params', () => {
        const actual = replacePathParams({
            url: `${BASE_URL}/section/{sectionType}`,
            params: {
                sectionType: 'comments',
                articleId: 1234,
            },
        });

        expect(actual).toEqual('http://some.domain.be/articles/1234/section/comments');
    });

    it('params for which no placeholders are found, are not replaced', () => {
        const actual = replacePathParams({
            url: `${BASE_URL}/section/{sectionType}`,
            params: {
                articleBadParamName: 1234,
                sectionType: 'comments',
            },
        });

        expect(actual).toEqual('http://some.domain.be/articles/{articleId}/section/comments');
    });

    it('string path params are encoded automatically', () => {
        const actual = replacePathParams({
            url: BASE_URL,
            params: {
                articleId: 'REUTERS id:1234',
            },
        });

        expect(actual).toEqual('http://some.domain.be/articles/REUTERS%20id%3A1234');
    });
});
