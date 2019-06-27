import constructResourceUrl from './constructResourceUrl';

describe('constructResourceUrl()', () => {
    it('prepends the url with the baseUrl if specified', () => {
        expect(constructResourceUrl({
            url: '/persons',
            baseUrl: '/rest',
        })).toEqual('/rest/persons');
    });

    it('does not prepend the url with a baseUrl if not specified', () => {
        expect(constructResourceUrl({
            url: '/persons',
        })).toEqual('/persons');
    });

    it('both replaces path params and appends query params', () => {
        expect(constructResourceUrl({
            url: '/persons/{personId}',
            pathParams: {
                personId: '1a2b3c',
            },
            queryParams: {
                search: 'some name',
                maxNrOfRecords: 12,
            },
        })).toEqual('/persons/1a2b3c?search=some%20name&maxNrOfRecords=12');
    });
});
