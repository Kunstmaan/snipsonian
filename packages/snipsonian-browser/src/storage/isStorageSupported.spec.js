/* global window */

import isStorageSupported from './isStorageSupported';
import STORAGE_TYPE from './storageType';
import createMockStorage from './createMockStorage';

describe('isStorageSupported()', () => {
    it('should pass the test if storage is supported', () => {
        Object.keys(STORAGE_TYPE).forEach((storageType) => {
            window[storageType] = createMockStorage();
            expect(isStorageSupported(storageType)).toBeTruthy();
        });
    });

    it('should fail the test if storage is not supported, or if given an invalid value', () => {
        Object.keys(STORAGE_TYPE).forEach((storageType) => {
            window[storageType] = undefined;
        });
        expect(isStorageSupported(STORAGE_TYPE.localStorage)).toBeFalsy();
    });
});
