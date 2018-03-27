import getLocalDvlpConfig from '../src/dvlp/getLocalDvlpConfig';

const DEFAULT_DEV_CONFIG = {
    ENABLE_STATE_STORAGE: true
};

const devConfig = getLocalDvlpConfig({
    storageKey: 'SNIPSONIAN_DVLP',
    defaultDevConfig: DEFAULT_DEV_CONFIG
});

export const isStateStorageEnabled = devConfig.ENABLE_STATE_STORAGE;
