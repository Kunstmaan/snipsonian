import cloneObjectDataProps from './cloneObjectDataProps';

describe('cloneObjectDataProps()', () => {
    // eslint-disable-next-line max-len
    it('returns a new object by copying the string, boolean, number, object and array (nested) properties of the input object', () => {
        const orig = {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            a: null,
            b: {
                m: [7, 8],
                n: true,
                o: 666,
                p: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    x: undefined,
                    y: 'deep',
                },
                q: function dummyFunction() {
                    return 'dummy';
                },
            },
            c: '123',
            d: ['q', 'e', 'd'],
        };

        const actual = cloneObjectDataProps(orig);

        expect(actual).toEqual({
            a: null,
            b: {
                m: [7, 8],
                n: true,
                o: 666,
                p: {
                    // no x !!! (undefined)
                    y: 'deep',
                },
                // no q !!! (function)
            },
            c: '123',
            d: ['q', 'e', 'd'],
        });

        /* eslint-disable @typescript-eslint/dot-notation */
        expect(actual === orig).toBeFalsy();

        expect(actual['b'] === orig['b']).toBeFalsy();
        expect(actual['b']['m'] === orig['b']['m']).toBeFalsy();
        expect(actual['b']['p'] === orig['b']['p']).toBeFalsy();

        expect(actual['c'] === orig['c']).toBeTruthy(); // string equality
        expect(actual['d'] === orig['d']).toBeFalsy();
        /* eslint-enable @typescript-eslint/dot-notation */
    });
});
