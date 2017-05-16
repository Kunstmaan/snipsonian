import replacePlaceholders from './replacePlaceholders';

describe('replacePlaceholders()', () => {
    it('replaces placeholders of the format {key} with the appropriate values where order does not matter', () => {
        const actual = replacePlaceholders({
            msg: 'Hello {callTitle} {firstName}!',
            placeholders: {
                firstName: 'John',
                callTitle: 'Mr.'
            }
        });

        expect(actual).toEqual('Hello Mr. John!');
    });

    it('replaces multiple times if needed', () => {
        const actual = replacePlaceholders({
            msg: '{someKey} bla bla {someKey} bla bla {someKey}',
            placeholders: {
                someKey: 123
            }
        });

        expect(actual).toEqual('123 bla bla 123 bla bla 123');
    });

    it('does not replace if the placeholder key does not occur within {}', () => {
        const actual = replacePlaceholders({
            msg: 'Does not contain placeholders.',
            placeholders: {
                not: 'oeps',
                contain: 'should not be used'
            }
        });

        expect(actual).toEqual('Does not contain placeholders.');
    });

    it('leaves placeholders unchanged if not provided as input', () => {
        const actual = replacePlaceholders({
            msg: 'This {missing} will not be replaced',
            placeholders: {}
        });

        expect(actual).toEqual('This {missing} will not be replaced');
    });

    it('no problem if placeholders object not passes as input', () => {
        const actual = replacePlaceholders({
            msg: 'This {missing} will not be replaced'
        });

        expect(actual).toEqual('This {missing} will not be replaced');
    });
});