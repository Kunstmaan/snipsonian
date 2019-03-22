import isStorageSupported from './isStorageSupported';
import STORAGE_TYPE from './storageType';

describe('isStorageSupported()', () => {
    it('should pass the test if storage is supported', () => {
        Object.keys(STORAGE_TYPE).forEach((storageType) => {
            expect(isStorageSupported(storageType)).toBeTruthy();
        });
    });

    it('should fail the test if storage is not supported, or if given an invalid value', () => {
        expect(isStorageSupported('wrongStorageType')).toBeFalsy();
    });
});
