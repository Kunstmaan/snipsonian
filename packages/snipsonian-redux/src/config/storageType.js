import STORAGE_TYPE from '../../../snipsonian-browser/src/storage/storageType';

export const STATE_STORAGE_TYPE = {
    LOCAL: STORAGE_TYPE.localStorage,
    SESSION: STORAGE_TYPE.sessionStorage,
    NO_STORAGE: 'NO_STORAGE'
};

export const REDUCER_STORAGE_TYPE = {
    LOCAL: STATE_STORAGE_TYPE.LOCAL,
    SESSION: STATE_STORAGE_TYPE.SESSION,
    NO_STORAGE: STATE_STORAGE_TYPE.NO_STORAGE,
    INHERIT: 'INHERIT'
};
