/* global window */

import createMockStorage from './createMockStorage';
import browserStorageFactory from './browserStorageFactory';
import STORAGE_TYPE from './storageType';

describe('browserStorageFactory.create()', () => {
    Object.keys(STORAGE_TYPE).forEach((storageType) => {
        it(`should create a working storage object for ${storageType}`, () => {
            window[storageType] = createMockStorage();
            const storage = browserStorageFactory.create(storageType);
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
