import {is, assert} from '../index';
import browserStorageFactory from '../storage/browserStorageFactory';
import createStoreStorageMiddleWare from './createStoreStorageMiddleWare';
import {getCombinedInitialState} from './reducerManager';
import mergeObjectPropsDeeply from '../generic/mergeObjectPropsDeeply';

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