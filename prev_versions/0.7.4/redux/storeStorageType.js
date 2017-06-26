import {STORAGE_TYPE} from '../storage/browserStorageFactory';

const STORE_STORAGE_TYPE = {
    LOCAL: STORAGE_TYPE.localStorage,
    SESSION: STORAGE_TYPE.sessionStorage,
    NO_STORAGE: 'NO_STORAGE'
};

export default STORE_STORAGE_TYPE;