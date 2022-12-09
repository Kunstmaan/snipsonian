import mergeObjectPropsDeeply, { mergeObjectPropsDeeplyOptionable } from './mergeObjectPropsDeeply';

describe('mergeObjectPropsDeeply()', () => {
    it('if less than 2 input objects', () => {
        expect(mergeObjectPropsDeeply()).toEqual({});
        expect(mergeObjectPropsDeeply({ a: 1 })).toEqual({ a: 1 });
    });

    it('returns a new object containing the immediate child props of all the input sources', () => {
        const source1 = { a: 1 };
        const source2 = { b: { c: '2' } };

        const actual = mergeObjectPropsDeeply(
            source1,
            source2,
        );

        expect(actual).toEqual({
            a: 1,
            b: {
                c: '2',
            },
        });
        expect(source1['b']).toBeUndefined(); // eslint-disable-line @typescript-eslint/dot-notation
        expect(source2['a']).toBeUndefined(); // eslint-disable-line @typescript-eslint/dot-notation
    });

    // eslint-disable-next-line max-len
    it('the last source takes precedence for properties occurring in multiple sources, but only if they have the same type', () => {
        const actual = mergeObjectPropsDeeply(
            {
                a: 1,
                c: 'x',
                d: true,
                e: true,
            },
            {
                a: 'z',
                b: ['a', 'b', 'c'],
                c: 'y',
                d: false,
                e: 1,
            },
        );

        expect(actual).toEqual({
            a: 1,
            b: ['a', 'b', 'c'],
            c: 'y',
            d: false,
            e: true,
        });
    });

    it('does NOT merge arrays (the last source takes precedence)', () => {
        const actual = mergeObjectPropsDeeply(
            { a: ['x', 'y'], b: [], c: ['test'] },
            { a: ['a', 'b', 'c'], b: [99], c: [] },
        );

        expect(actual).toEqual({
            a: ['a', 'b', 'c'],
            b: [99],
            c: [],
        });
    });

    it('merges deeply = nested objects', () => {
        /* eslint-disable function-paren-newline */
        const actual = mergeObjectPropsDeeply(
            {
                a: 1,
                c: {
                    x: 'xxx',
                    z: 999,
                    s: 456,
                    n: {
                        o: 123,
                        q: 789,
                        r: ['no'],
                    },
                },
            },
            {
                b: 2,
                c: {
                    y: 'yyy',
                    z: 'zzz',
                    s: 567,
                    n: {
                        o: 456,
                        p: 'qed',
                        r: ['yes'],
                    },
                },
            },
        );
        /* eslint-enable function-paren-newline */

        expect(actual).toEqual({
            a: 1,
            b: 2,
            c: {
                x: 'xxx',
                y: 'yyy',
                z: 999,
                s: 567,
                n: {
                    o: 456,
                    p: 'qed',
                    q: 789,
                    r: ['yes'],
                },
            },
        });
    });

    it('does not overwrite an object prop with a value that is not an object', () => {
        /* eslint-disable function-paren-newline */
        const actual = mergeObjectPropsDeeply(
            {
                a: {
                    m: {
                        x: 1,
                        y: ['yes'],
                    },
                    n: {},
                    o: {
                        z: [],
                    },
                },
                b: {
                    q: 123,
                },
            },
            {
                a: {
                    m: 'yyy',
                    n: null,
                    // o: undefined,
                    p: 'taken',
                },
                b: 'r',
            },
        );
        /* eslint-enable function-paren-newline */

        expect(actual).toEqual({
            a: {
                m: {
                    x: 1,
                    y: ['yes'],
                },
                n: {},
                o: {
                    z: [],
                },
                p: 'taken',
            },
            b: {
                q: 123,
            },
        });
    });

    it('does not overwrite a non-object prop with a value that is an object', () => {
        /* eslint-disable function-paren-newline */
        const actual = mergeObjectPropsDeeply(
            {
                a: {
                    m: 'yyy',
                    n: 123,
                },
                b: 'r',
            },
            {
                a: {
                    m: {
                        x: 1,
                        y: ['yes'],
                    },
                    n: {
                        z: 'b',
                    },
                },
                b: {
                    q: 123,
                },
            },
        );
        /* eslint-enable function-paren-newline */

        expect(actual).toEqual({
            a: {
                m: 'yyy',
                n: 123,
            },
            b: 'r',
        });
    });

    it('overwrites a null/undefined property with a object prop', () => {
        /* eslint-disable function-paren-newline */
        const actual = mergeObjectPropsDeeply(
            {
                a: {
                    m: null,
                    n: undefined,
                    // o: undefined
                },
            },
            {
                a: {
                    m: {
                        s: 'ok',
                    },
                    n: {},
                    o: {
                        x: 456,
                        y: 'qed',
                        z: ['yes'],
                    },
                },
            },
        );
        /* eslint-enable function-paren-newline */

        expect(actual).toEqual({
            a: {
                m: {
                    s: 'ok',
                },
                n: {},
                o: {
                    x: 456,
                    y: 'qed',
                    z: ['yes'],
                },
            },
        });
    });

    // eslint-disable-next-line max-len
    it('clones on all levels (deeply) so that no upper/inner object or array of the input sources are changed in either way', () => {
        const source1 = { a: 1, f: { g: '6' }, h: ['7', '8'] };
        const source2 = { b: { c: { d: '2' }, e: [3, 4, 5] } };

        const actual = mergeObjectPropsDeeply(
            source1,
            source2,
        );

        expect(actual).toEqual({
            a: 1,
            b: {
                c: { d: '2' },
                e: [3, 4, 5],
            },
            f: {
                g: '6',
            },
            h: ['7', '8'],
        });

        expect(actual === source1).toBeFalsy();
        expect(actual === source2).toBeFalsy();

        /* eslint-disable @typescript-eslint/dot-notation */
        expect(actual['b'] === source2['b']).toBeFalsy();
        expect(actual['b']['c'] === source2['b']['c']).toBeFalsy();
        expect(actual['b']['e'] === source2['b']['e']).toBeFalsy();

        expect(actual['f'] === source1['f']).toBeFalsy();
        expect(actual['h'] === source1['h']).toBeFalsy();
        /* eslint-enable @typescript-eslint/dot-notation */
    });

    it('by default does not overwrite props that are null/undefined in later sources', () => {
        const source1 = {
            a: {
                b: 'should remain',
                c: 'should also remain',
                d: 'will be overwritten',
                e: null as number,
            },
            x: {
                y: 999,
            },
        };
        const source2 = {
            a: {
                b: null as string,
                c: undefined as string,
                d: 'new value',
                e: 123,
            },
            x: null as string,
        };

        const actual = mergeObjectPropsDeeply(
            source1,
            source2,
        );

        expect(actual).toEqual({
            a: {
                b: 'should remain',
                c: 'should also remain',
                d: 'new value',
                e: 123,
            },
            x: {
                y: 999,
            },
        });
    });

    it('allows to overrule the default behaviour so that props who are null/undefined in later sources ' +
        'are used to overwrite the original value', () => {
        const source1 = {
            a: {
                b: 'should be overwritten by null',
                c: 'should be overwritten by undefined',
                d: 'will be overwritten',
                e: null as number,
            },
            x: {
                y: 999,
            },
        };
        const source2 = {
            a: {
                b: null as string,
                c: undefined as string,
                d: 'new value',
                e: 123,
            },
            x: null as string,
        };

        const actual = mergeObjectPropsDeeplyOptionable({
            sources: [source1, source2],
            options: {
                ignoreUndefinedSourceProps: false,
                ignoreNullSourceProps: false,
            },
        });

        expect(actual).toEqual({
            a: {
                b: null,
                c: undefined,
                d: 'new value',
                e: 123,
            },
            x: null,
        });
    });
});
