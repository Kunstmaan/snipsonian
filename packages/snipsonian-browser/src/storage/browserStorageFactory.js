/* global window */

import assert from '../../../snipsonian-core/src/assert';
import STORAGE_TYPE, {isValidStorageType} from './storageType';
import isStorageSupported from './isStorageSupported';

export default {
    create,
    STORAGE_TYPE
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
