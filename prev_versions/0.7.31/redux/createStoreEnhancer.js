import {is, assert} from '../index';
import browserStorageFactory from '../storage/browserStorageFactory';
import createStoreStorageMiddleWare from './createStoreStorageMiddleWare';
import {getCombinedInitialState} from './reducerManager';
import STORE_STORAGE_TYPE from './storeStorageType';
import mergeObjectPropsDeeply from '../generic/mergeObjectPropsDeeply';

export default function createStoreEnhancer({
    middlewares = [],
    storeStorageType = STORE_STORAGE_TYPE.NO_STORAGE,
    storeStorageKey
}) {
    const preloadedState = {};

    if (storeStorageType !== STORE_STORAGE_TYPE.NO_STORAGE) {
        assert(
            storeStorageKey,
            isValidStorageKey,
            `The storeStorageKey input {val} should be a valid string when storeStorageType is not ${STORE_STORAGE_TYPE.NO_STORAGE}`
        );

        const storage = browserStorageFactory.create(storeStorageType);
        const storeStorageMiddleWare = createStoreStorageMiddleWare({storage, storeStorageKey});

        middlewares.push(storeStorageMiddleWare.createMiddleware());

        joinStoredStoreWithMissingPropsThatPossiblyWereNewlyAddedInTheReducers(
            storeStorageMiddleWare.getStore()
        );
    }

    return {
        preloadedState,
        middlewares
    };
}

function isValidStorageKey(storeStorageKey) {
    return is.set(storeStorageKey) && is.string(storeStorageKey) && (storeStorageKey.trim().length > 0);
}

function joinStoredStoreWithMissingPropsThatPossiblyWereNewlyAddedInTheReducers(storedStore) {
    // TODO also remove the top reducer props that do not occur anymore in the combined initial state?

    // 2nd source takes precedence above the 1st source
    return mergeObjectPropsDeeply(getCombinedInitialState(), storedStore);
}