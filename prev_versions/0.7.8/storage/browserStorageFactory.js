/* global window */

import {assert} from '../generic/assert';
import {is} from '../generic/is';

export const STORAGE_TYPE = {
    localStorage: 'localStorage',
    sessionStorage: 'sessionStorage'
};

function create(storageType = STORAGE_TYPE.localStorage) {
    assert(storageType, isValidStorageType, 'Input storageType `{val}` has an unexpected value.');

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

function isValidStorageType(storageType) {
    return is.set(STORAGE_TYPE[storageType]);
}

export default {
    create,
    STORAGE_TYPE
};