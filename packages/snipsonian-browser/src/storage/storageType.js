import isSet from '../../../snipsonian-core/src/is/isSet';

const STORAGE_TYPE = {
    localStorage: 'localStorage',
    sessionStorage: 'sessionStorage',
};

export default STORAGE_TYPE;

export function isValidStorageType(storageType) {
    return isSet(STORAGE_TYPE[storageType]);
}
