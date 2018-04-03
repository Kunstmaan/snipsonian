/* global window */

import isStorageSupported from './isStorageSupported';
import STORAGE_TYPE from './storageType';
import MockStorage from './MockStorage';

describe('isStorageSupported()', () => {
    it('should pass the test if storage is supported', () => {
        Object.keys(STORAGE_TYPE).forEach((storageType) => {
            window[storageType] = new MockStorage(storageType);
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
