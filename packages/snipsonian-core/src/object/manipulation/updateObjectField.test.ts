import updateObjectField from './updateObjectField';
import cloneObjectDataProps from '../cloneObjectDataProps';

describe('updateObjectField()', () => {
    const COMPLEX_OBJ = {
        name: 'Doe',
        firstName: 'John',
        meta: {
            version: 3,
            languages: ['nl', 'en'],
            job: {
                category: 'IT',
                location: 'Leuven',
            },
            children: [{ name: 'Kimberly', age: 10 }, { name: 'Kelly', age: 8 }],
            pets: {
                0: { name: 'barkly', type: 'dog' },
                1: { name: 'kitkat', type: 'cat' },
            },
        },
    };

    it('updates the specified field when it is just a top field', () => {
        const obj = cloneObjectDataProps(COMPLEX_OBJ);
        const expectedObj = cloneObjectDataProps(COMPLEX_OBJ);

        const actual = updateObjectField({ obj, fieldToUpdateRef: 'firstName', val: 'Jane' });

        expectedObj.firstName = 'Jane';
        expect(actual).toEqual(expectedObj);
    });

    it('updates nested object properties', () => {
        const obj = cloneObjectDataProps(COMPLEX_OBJ);
        const expectedObj = cloneObjectDataProps(COMPLEX_OBJ);

        const actual = updateObjectField({ obj, fieldToUpdateRef: 'meta.version', val: 44 });

        expectedObj.meta.version = 44;
        expect(actual).toEqual(expectedObj);
    });

    it('updates nested array values', () => {
        const obj = cloneObjectDataProps(COMPLEX_OBJ);
        const expectedObj = cloneObjectDataProps(COMPLEX_OBJ);

        const actual = updateObjectField({ obj, fieldToUpdateRef: 'meta.languages[1]', val: 'fr' });

        expectedObj.meta.languages = ['nl', 'fr'];
        expect(actual).toEqual(expectedObj);
    });

    it('updates nested arraylike object values', () => {
        const obj = cloneObjectDataProps(COMPLEX_OBJ);
        const expectedObj = cloneObjectDataProps(COMPLEX_OBJ);

        const actual = updateObjectField({ obj, fieldToUpdateRef: 'meta.pets.1.name', val: 'twix' });

        expectedObj.meta.pets[1] = { name: 'twix', type: 'cat' };
        expect(actual).toEqual(expectedObj);
    });

    it('updates deeply nested values', () => {
        const obj = cloneObjectDataProps(COMPLEX_OBJ);
        const expectedObj = cloneObjectDataProps(COMPLEX_OBJ);

        const actualTemp = updateObjectField({ obj, fieldToUpdateRef: 'meta.job.category', val: 'HR' });
        const actual = updateObjectField({ obj: actualTemp, fieldToUpdateRef: 'meta.children[1].age', val: 21 });

        expectedObj.meta.job.category = 'HR';
        expectedObj.meta.children[1].age = 21;
        expect(actual).toEqual(expectedObj);
    });
});
