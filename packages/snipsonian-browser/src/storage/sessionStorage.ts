import browserStorageFactory from './browserStorageFactory';
import STORAGE_TYPE from './storageType';

const sessionStorage = browserStorageFactory.create(STORAGE_TYPE.sessionStorage);

export default sessionStorage;
