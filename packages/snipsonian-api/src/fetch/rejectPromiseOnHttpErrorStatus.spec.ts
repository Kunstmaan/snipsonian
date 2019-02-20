import rejectPromiseOnHttpErrorStatus from './rejectPromiseOnHttpErrorStatus';

describe('rejectPromiseOnHttpErrorStatus()', () => {
    it('should throw an error when receiving an erronous status code', () => {
        // Commonly used status codes to indicate error (all kinds of errors)
        const errorResponses = [
            { status: 400 },
            { status: 401 },
            { status: 403 },
            { status: 404 },
            { status: 422 },
            { status: 500 },
            { status: 502 },
            { status: 503 },
            { status: 504 },
        ];

        errorResponses.forEach((response) => {
            expect(() => {
                rejectPromiseOnHttpErrorStatus(response as Response);
            }).toThrow();
        });
    });

    it('should return the response when it is successful', () => {
        // Commonly used status codes to indicate success
        const successResponses = [
            { status: 200 },
            { status: 201 },
            { status: 202 },
            { status: 204 },
        ];

        successResponses.forEach((response) => {
            expect(rejectPromiseOnHttpErrorStatus(response as Response)).toBe(response);
        });
    });
});
