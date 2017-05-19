import browserStorageFactory from '../storage/browserStorageFactory';
import createStoreStorageMiddleWare from './createStoreStorageMiddleWare';

export const NO_STORAGE = 'NO_STORAGE';

export default function createStoreEnhancer({
    middlewares = [],
    storeStorageType = NO_STORAGE,
    storeStorageKey
}) {
    let preloadedState = {};

    if (storeStorageType !== NO_STORAGE) {
        const storage = browserStorageFactory.create(storeStorageType);
        const storeStorageMiddleWare = createStoreStorageMiddleWare({storage, storeStorageKey});

        middlewares.push(storeStorageMiddleWare.createMiddleware());

        preloadedState = storeStorageMiddleWare.getStore();
    }

    return {
        preloadedState,
        middlewares
    };
}
