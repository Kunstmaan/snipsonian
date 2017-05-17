import localStorage from '../src/storage/localStorage';

const STORAGE_KEY = 'SNIPSONIAN_DVLP';

const DEFAULT_DEV_CONFIG = {
    ENABLE_STATE_STORAGE: true
};

const storedDevConfig = localStorage.readOrSave({
    key: STORAGE_KEY,
    valueToSaveIfNotThere: DEFAULT_DEV_CONFIG
});

const mergedDevConfig = Object.assign({}, DEFAULT_DEV_CONFIG, storedDevConfig);

localStorage.save({
    key: STORAGE_KEY,
    value: mergedDevConfig
});

export const isStateStorageEnabled = mergedDevConfig.ENABLE_STATE_STORAGE;
