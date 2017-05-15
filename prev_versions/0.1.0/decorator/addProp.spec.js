import addProp from './addProp';
import {is} from '../index';

describe('addProp()', () => {
    it('follows the decorator pattern : returns a decorate function that in turn expects the target as input', () => {
        const actual = addProp();

        expect(is.function(actual)).toEqual(true);
    });

    it('enriches the input entity (= target) by adding a property using the input propName and propValue', () => {
        const someTarget = {
            existingProp: 'existing value'
        };
        expect(someTarget.extraProp).not.toBeDefined();

        addProp('extraProp', 198032)(someTarget);

        expect(someTarget.existingProp).toEqual('existing value');
        expect(someTarget.extraProp).toEqual(198032);
    });

    it('throws an error if the propName is not provided as input', () => {
        const shouldThrowError = () =>
            addProp()({});

        expect(shouldThrowError).toThrowError('Required input argument \'propName\' is missing.');
    });

    it('sets the new property to undefined if input propValue not provided (no error thrown)', () => {
        const actual = addProp('propWithoutValue')({});

        expect(actual).toEqual({
            propWithoutValue: undefined
        });
    });

    it('enriches each entry if the input is an array', () => {
        const firstEntity = {};
        const secondEntity = {};

        const actual = addProp('someProp', 'some value')([firstEntity, secondEntity]);

        expect(actual.length).toEqual(2);

        expect(firstEntity.someProp).toEqual('some value');
        expect(secondEntity.someProp).toEqual('some value');
    });
});