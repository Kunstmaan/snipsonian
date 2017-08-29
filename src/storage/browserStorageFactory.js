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

        exists: ({key}) => {
            if (!storage.isSupported) {
                return false;
            }

            return window[storageType].getItem(key) !== null;
        },

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
    try {
        const x = '__storage_test__';
        window[storageType].setItem(x, x);
        window[storageType].removeItem(x);
        return true;
    } catch (e) {
        return false;
    }
}

function isValidStorageType(storageType) {
    return is.set(STORAGE_TYPE[storageType]);
}

export default {
    create,
    STORAGE_TYPE
};