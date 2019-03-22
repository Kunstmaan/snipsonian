import browserStorageFactory from './browserStorageFactory';
import STORAGE_TYPE from './storageType';

const localStorage = browserStorageFactory.create(STORAGE_TYPE.localStorage);

export default localStorage;
