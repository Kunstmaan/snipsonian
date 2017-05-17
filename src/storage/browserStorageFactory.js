/* global window */

export const STORAGE_TYPE = {
    LOCAL_STORAGE: 'localStorage',
    SESSION_STORAGE: 'sessionStorage'
};

function create(storageType = STORAGE_TYPE.LOCAL_STORAGE) {
    const storage = {
        isSupported: isStorageSupported(storageType),

        save: ({key, value}) => {
            if (storage.isSupported) {
                window[storageType].setItem(key, JSON.stringify(value));
            }
        },

        read: ({key, defaultValue = false}) => {
            if (!storage.isSupported) {
                return undefined;
            }
            return JSON.parse(window[storageType].getItem(key)) || defaultValue;
        },

        remove: ({key}) => {
            if (storage.isSupported) {
                window[storageType].removeItem(key);
            }
        },

        readOrSave: ({key, valueToSaveIfNotThere}) => {
            const value = storage.read({key, defaultValue: null});

            if (value === null) {
                storage.save({key, value: valueToSaveIfNotThere});
                return valueToSaveIfNotThere;
            }

            return value;
        }
    };

    return storage;
}

function isStorageSupported(storageType) {
    return (typeof window !== 'undefined') && window[storageType];
}

export default {
    create,
    STORAGE_TYPE
};