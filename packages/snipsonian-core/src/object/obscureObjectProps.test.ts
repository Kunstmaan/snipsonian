import { obscureObjectProps } from './obscureObjectProps';

describe('obscureObjectProps()', () => {
    it('obscures the matching (nested) properties on a clone of the input object', () => {
        const original = {
            someProp: 12345,
            thisIsSensitive: 'we do not want to display this in a log for example',
            nested: {
                showMe: 'abc',
                obscureMe: 666,
            },
        };

        const actual = obscureObjectProps({
            obj: original,
            propPathsToObscure: [
                'thisIsSensitive',
                'nested.obscureMe',
            ],
        });

        expect(actual).toEqual({
            someProp: 12345,
            thisIsSensitive: '***obscured***',
            nested: {
                showMe: 'abc',
                obscureMe: '***obscured***',
            },
        });

        /* verify that the original input object was not changed */
        expect(original).toEqual({
            someProp: 12345,
            thisIsSensitive: 'we do not want to display this in a log for example',
            nested: {
                showMe: 'abc',
                obscureMe: 666,
            },
        });
    });

    it('the default obscureValue can be overruled', () => {
        const actual = obscureObjectProps({
            obj: {
                someField: 'xyz',
                nested: {
                    someField: 'xyz',
                },
            },
            propPathsToObscure: [
                'nested.someField',
            ],
            obscureValue: '--X--',
        });

        expect(actual).toEqual({
            someField: 'xyz',
            nested: {
                someField: '--X--',
            },
        });
    });

    it('if false is provided as obscureValue, then the property is removed from the return clone instead', () => {
        const original = {
            someField: 'xyz',
            someOtherField: 123,
            nested: {
                someField: 'abc',
            },
        };

        const actual = obscureObjectProps({
            obj: original,
            propPathsToObscure: [
                'someOtherField',
                'nested.someField',
            ],
            obscureValue: false,
        });

        expect(actual).toEqual({
            someField: 'xyz',
            nested: {},
        });

        /* verify that the original input object was not changed */
        expect(original).toEqual({
            someField: 'xyz',
            someOtherField: 123,
            nested: {
                someField: 'abc',
            },
        });
    });

    it('does not set the obscure value if the requested property was not found', () => {
        const actual = obscureObjectProps({
            obj: {
                someField: 'xyz',
                nested: {
                    someField: 'xyz',
                },
            },
            propPathsToObscure: [
                'nested.otherField',
            ],
        });

        expect(actual).toEqual({
            someField: 'xyz',
            nested: {
                someField: 'xyz',
            },
        });
    });

    it('returns the input if it is not an object', () => {
        expect(obscureObjectProps({
            obj: null,
            propPathsToObscure: ['does.not.matter'],
        })).toEqual(null);

        expect(obscureObjectProps({
            // eslint-disable-next-line @typescript-eslint/ban-types
            obj: 'abc' as unknown as object,
            propPathsToObscure: ['does.not.matter'],
        })).toEqual('abc');
    });
});
