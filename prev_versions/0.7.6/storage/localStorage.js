import browserStorageFactory, {STORAGE_TYPE} from './browserStorageFactory';

const localStorage = browserStorageFactory.create(STORAGE_TYPE.LOCAL_STORAGE);

export default localStorage;
