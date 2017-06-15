import mergeObjectPropsDeeply from './mergeObjectPropsDeeply';

describe('mergeObjectPropsDeeply()', () => {
    it('if less than 2 input objects', () => {
        expect(mergeObjectPropsDeeply()).toEqual({});
        expect(mergeObjectPropsDeeply({a: 1})).toEqual({a: 1});
    });

    it('returns a new object containing the immediate child props of all the input sources', () => {
        const source1 = {a: 1};
        const source2 = {b: {c: '2'}};

        const actual = mergeObjectPropsDeeply(
            source1,
            source2
        );

        expect(actual).toEqual({
            a: 1,
            b: {
                c: '2'
            }
        });
        expect(source1.b).toBeUndefined();
        expect(source2.a).toBeUndefined();
    });

    it('the last source takes precedence for properties occurring in multiple sources', () => {
        const actual = mergeObjectPropsDeeply(
            {a: 1},
            {a: 'z', b: ['a', 'b', 'c']}
        );

        expect(actual).toEqual({
            a: 'z',
            b: ['a', 'b', 'c']
        });
    });

    it('does NOT merge arrays (the last source takes precedence)', () => {
        const actual = mergeObjectPropsDeeply(
            {a: ['x', 'y'], b: 3, c: ['test']},
            {a: ['a', 'b', 'c'], b: [99], c: []}
        );

        expect(actual).toEqual({
            a: ['a', 'b', 'c'],
            b: [99],
            c: []
        });
    });

    it('merges deeply = nested objects', () => {
        const actual = mergeObjectPropsDeeply(
            {
                a: 1,
                c: {
                    x: 'xxx',
                    z: 999,
                    n: {
                        o: 123,
                        q: 789,
                        r: ['no']
                    }
                }
            }, {
                b: 2,
                c: {
                    y: 'yyy',
                    z: 'zzz',
                    n: {
                        o: 456,
                        p: 'qed',
                        r: ['yes']
                    }
                }
            }
        );

        expect(actual).toEqual({
            a: 1,
            b: 2,
            c: {
                x: 'xxx',
                y: 'yyy',
                z: 'zzz',
                n: {
                    o: 456,
                    p: 'qed',
                    q: 789,
                    r: ['yes']
                }
            }
        });
    });
});