import getPossiblyNestedObjectPropValue from './getPossiblyNestedObjectPropValue';

describe('getPossiblyNestedObjectPropValue()', () => {
    const TEST_OBJECT = {
        someField: 'someValue',
        levelOne: {
            levelTwo: {
                levelTwoField: false,
                levelThree: {
                    deepField: 'qwerty',
                    otherDeepField: 123,
                },
            },
            levelOneField: 'qed',
            levelTwoArray: [{
                fieldInArray: 'abc',
            }],
        },
    };

    it('returns a - possibly nested - field value that matches the input path part(s)', () => {
        expect(getPossiblyNestedObjectPropValue(
            TEST_OBJECT,
            'someField',
        )).toEqual('someValue');

        expect(getPossiblyNestedObjectPropValue(
            TEST_OBJECT,
            'levelOne', 'levelOneField',
        )).toEqual('qed');

        expect(getPossiblyNestedObjectPropValue(
            TEST_OBJECT,
            'levelOne', 'levelTwo', 'levelTwoField',
        )).toEqual(false);
        expect(getPossiblyNestedObjectPropValue(
            TEST_OBJECT,
            'levelOne', 'levelTwo', 'levelThree', 'deepField',
        )).toEqual('qwerty');
        expect(getPossiblyNestedObjectPropValue(
            TEST_OBJECT,
            'levelOne', 'levelTwo', 'levelThree', 'otherDeepField',
        )).toEqual(123);
        expect(getPossiblyNestedObjectPropValue(
            TEST_OBJECT,
            'levelOne', 'levelTwoArray', '0', 'fieldInArray',
        )).toEqual('abc');

        expect(getPossiblyNestedObjectPropValue(
            TEST_OBJECT,
            'levelOne', 'levelTwo', 'levelThree',
        )).toEqual({
            deepField: 'qwerty',
            otherDeepField: 123,
        });
    });
});
