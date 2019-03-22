import STORAGE_TYPES, { isValidStorageType } from './storageType';

describe('isValidStorageType() - in storageType.js', () => {
    it('should return false when given a value that isn"t a valid storage type', () => {
        expect(isValidStorageType(undefined)).toBeFalsy();
        expect(isValidStorageType(null)).toBeFalsy();
        expect(isValidStorageType('1234')).toBeFalsy();
        expect(isValidStorageType('locaStorage')).toBeFalsy();
    });

    it('should return true when passed a valid storage type', () => {
        Object.values(STORAGE_TYPES).forEach((storageType) => {
            expect(isValidStorageType(storageType)).toBeTruthy();
        });
    });
});
