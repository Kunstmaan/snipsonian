import doesAnyObjectValueMatchFilter from './doesAnyObjectValueMatchFilter';

describe('doesAnyObjectValueMatchFilter()', () => {
    const testObject = {
        id: 3,
        name: 'testObject',
        description: 'test',
        hiddenKey: 'neverShareThisKey',
    };

    it('returns true if any property of the input object matches the input string filter', () => {
        expect(doesAnyObjectValueMatchFilter(testObject, '3')).toBeTruthy();
        expect(doesAnyObjectValueMatchFilter(testObject, 'test')).toBeTruthy();
        expect(doesAnyObjectValueMatchFilter(testObject, 'wrong')).toBeFalsy();
    });

    it('allows to ignore some object properties so that they are not matched against the filter', () => {
        const filter = 'neverShare';

        expect(doesAnyObjectValueMatchFilter(
            testObject,
            filter,
        )).toBeTruthy();

        expect(doesAnyObjectValueMatchFilter(
            testObject,
            filter,
            { fieldsToIgnore: ['hiddenKey'] },
        )).toBeFalsy();
    });
});
