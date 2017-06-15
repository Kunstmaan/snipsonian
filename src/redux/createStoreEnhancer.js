import {is, assert} from '../index'
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
        assert(
            storeStorageKey,
            isValidStorageKey,
            `The storeStorageKey input {val} should be a valid string when storeStorageType is not ${NO_STORAGE}`
        );

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

function isValidStorageKey(storeStorageKey) {
    return is.set(storeStorageKey) && is.string(storeStorageKey) && (storeStorageKey.trim().length > 0)
}