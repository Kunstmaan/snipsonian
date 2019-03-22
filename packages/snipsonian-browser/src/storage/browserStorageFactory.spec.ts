import browserStorageFactory from './browserStorageFactory';
import STORAGE_TYPE from './storageType';

describe('browserStorageFactory.create()', () => {
    Object.values(STORAGE_TYPE).forEach((storageType) => {
        it(`should create a working storage object for ${storageType}`, () => {
            const storage = browserStorageFactory.create(storageType as STORAGE_TYPE);
            const test = {
                key: 'key',
                value: { prop: 'value' },
            };
            const { key, value } = test;

            storage.save(test);

            expect(storage.read({ key })).toEqual(test.value);
            expect(storage.exists({ key })).toBeTruthy();

            storage.remove({ key });

            expect(storage.exists({ key })).toBeFalsy();
            expect(storage.read({ key })).toBeFalsy();

            expect(storage.readOrSave({ key, valueToSaveIfNotThere: value })).toEqual(test.value);
        });
    });
});
