import assert from '../../../snipsonian-core/src/assert';
import STORAGE_TYPE, { isValidStorageType } from './storageType';
import isStorageSupported from './isStorageSupported';

type TStorageValue = string | boolean | object;

export interface IBrowserStorage {
    isSupported: boolean;
    exists: (props: { key: string }) => boolean;
    save: (props: { key: string, value: TStorageValue }) => void;
    read: (props: { key: string, defaultValue?: TStorageValue }) => TStorageValue;
    remove: (props: { key: string }) => void;
    readOrSave: (props: { key: string, valueToSaveIfNotThere: TStorageValue }) => TStorageValue;
}

export default {
    create,
    STORAGE_TYPE,
};

function create(storageType: STORAGE_TYPE = STORAGE_TYPE.localStorage): IBrowserStorage {
    assert(storageType, isValidStorageType, 'Input storageType `{val}` has an unexpected value.');

    const storage: IBrowserStorage = {
        isSupported: isStorageSupported(storageType),

        exists: ({ key }: { key: string }) => {
            if (!storage.isSupported) {
                return false;
            }

            return window[storageType].getItem(key) !== null;
        },

        save: ({ key, value }: { key: string, value: TStorageValue }) => {
            if (storage.isSupported) {
                window[storageType].setItem(key, JSON.stringify(value));
            }
        },

        read: ({ key, defaultValue = false }: { key: string, defaultValue?: TStorageValue }) => {
            if (!storage.isSupported) {
                return undefined;
            }
            return JSON.parse(window[storageType].getItem(key)) || defaultValue;
        },

        remove: ({ key }: { key: string }) => {
            if (storage.isSupported) {
                window[storageType].removeItem(key);
            }
        },

        readOrSave: ({ key, valueToSaveIfNotThere }: { key: string, valueToSaveIfNotThere: TStorageValue }) => {
            const value = storage.read({ key, defaultValue: null });

            if (value === null) {
                storage.save({ key, value: valueToSaveIfNotThere });
                return valueToSaveIfNotThere;
            }

            return value;
        },
    };

    return storage;
}
