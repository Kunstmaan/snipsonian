/* global window */

export default function isStorageSupported(storageType) {
    try {
        const x = '__storage_test__';
        window[storageType].setItem(x, x);
        window[storageType].removeItem(x);
        return true;
    } catch (e) {
        return false;
    }
}
