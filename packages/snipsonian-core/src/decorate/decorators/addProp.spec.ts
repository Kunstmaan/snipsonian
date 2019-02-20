import addProp from './addProp';
import isFunction from '../../is/isFunction';

describe('addProp()', () => {
    it('follows the decorator pattern : returns a decorate function that in turn expects the target as input', () => {
        const actual = addProp(undefined, undefined);

        expect(isFunction(actual)).toEqual(true);
    });

    it('enriches the input entity (= target) by adding a property using the input propName and propValue', () => {
        const someTarget = {
            existingProp: 'existing value',
        };
        const PROP_NAME = 'extraProp';
        expect(someTarget[PROP_NAME]).not.toBeDefined();

        addProp(PROP_NAME, 198032)(someTarget);

        expect(someTarget.existingProp).toEqual('existing value');
        expect(someTarget[PROP_NAME]).toEqual(198032);
    });

    it('throws an error if the propName is not provided as input', () => {
        const shouldThrowError = () =>
            addProp(undefined, undefined)({});

        expect(shouldThrowError).toThrowError('Required input argument \'propName\' is missing.');
    });

    it('sets the new property to undefined if input propValue not provided (no error thrown)', () => {
        const actual = addProp('propWithoutValue', undefined)({});

        expect(actual).toEqual({
            propWithoutValue: undefined,
        });
    });

    it('enriches each entry if the input is an array', () => {
        const firstEntity = {};
        const secondEntity = {};
        const PROP_NAME = 'someProp';

        const actual = addProp(PROP_NAME, 'some value')([firstEntity, secondEntity]);

        expect(actual.length).toEqual(2);

        expect(firstEntity[PROP_NAME]).toEqual('some value');
        expect(secondEntity[PROP_NAME]).toEqual('some value');
    });

    it(
        'does not add the prop if the value is not set (e.g. undefined)' +
        'AND if the addIfValueUnset setting is false (default true)',
        () => {
            const someTarget = {
                existingProp: 'existing value',
            };
            const PROP_SHOULD_BE_ADDED = 'shouldBeAdded';
            const PROP_SHOULD_NOT_BE_ADDED = 'shouldNotBeAdded';

            addProp(PROP_SHOULD_BE_ADDED, null, { addIfValueUnset: true })(someTarget);
            addProp(PROP_SHOULD_NOT_BE_ADDED, null, { addIfValueUnset: false })(someTarget);

            expect(someTarget[PROP_SHOULD_BE_ADDED]).toBeDefined();
            expect(someTarget[PROP_SHOULD_BE_ADDED]).toBeNull();
            expect(someTarget[PROP_SHOULD_NOT_BE_ADDED]).not.toBeDefined();
        },
    );
});
