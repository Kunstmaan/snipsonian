import {is, assert} from '../index';
import browserStorageFactory from '../storage/browserStorageFactory';
import getStateStorageMiddlewareFactory from './getStateStorageMiddlewareFactory';
import getStateStorageByReducerMiddlewareFactory from './getStateStorageByReducerMiddlewareFactory';
import {
    getCombinedInitialState,
    areThereReducersWithoutStorageTypeInherit,
    areThereReducersThatHaveToBeStoredSpecifically,
    getMapOfReducersThatHaveToBeStoredSpecifically
} from './reducerManager';
import {STATE_STORAGE_TYPE} from './storageType';
import mergeObjectPropsDeeply from '../generic/mergeObjectPropsDeeply';

export default function createStoreEnhancer({
    middlewares = [],
    stateStorageType = STATE_STORAGE_TYPE.NO_STORAGE,
    stateStorageKey,
    customStorageMap = {}
}) {
    let preloadedState = {};

    const storageMap = Object.assign({}, customStorageMap);

    let stateStorageMiddlewareFactory;

    if (stateStorageType !== STATE_STORAGE_TYPE.NO_STORAGE) {
        assertStateStorageKey({
            stateStorageKey,
            // eslint-disable-next-line prefer-template
            errorMessage: 'The stateStorageKey input {val} should be a valid string when stateStorageType is not '
                + STATE_STORAGE_TYPE.NO_STORAGE
        });

        if (!areThereReducersWithoutStorageTypeInherit()) {
            const storage = getOrAddStorage({storageMap, storageType: stateStorageType});

            stateStorageMiddlewareFactory = getStateStorageMiddlewareFactory({
                storage,
                stateStorageKey
            });
        }
    }

    if ((stateStorageType !== STATE_STORAGE_TYPE.NO_STORAGE && areThereReducersWithoutStorageTypeInherit())
        || areThereReducersThatHaveToBeStoredSpecifically()) {
        assertStateStorageKey({
            stateStorageKey,
            errorMessage: 'The stateStorageKey input {val} should be a valid string when at least one reducer has ' +
                'a specific reducerStorageType'
        });

        const reducerStorageTypeMap = getMapOfReducersThatHaveToBeStoredSpecifically({stateStorageType});

        const storageToReducerKeysConfigs = getStorageToReducerKeysConfigs({reducerStorageTypeMap, storageMap});

        stateStorageMiddlewareFactory = getStateStorageByReducerMiddlewareFactory({
            storageToReducerKeysConfigs,
            stateStorageKey
        });
    }

    if (stateStorageMiddlewareFactory) {
        middlewares.push(stateStorageMiddlewareFactory.createMiddleware());

        preloadedState = joinStoredStateWithMissingPropsThatPossiblyWereNewlyAddedInTheReducers(
            stateStorageMiddlewareFactory.getState()
        );
    }

    return {
        preloadedState,
        middlewares
    };
}

function assertStateStorageKey({stateStorageKey, errorMessage}) {
    assert(
        stateStorageKey,
        isValidStorageKey,
        errorMessage
    );
}

function isValidStorageKey(stateStorageKey) {
    return is.set(stateStorageKey) && is.string(stateStorageKey) && (stateStorageKey.trim().length > 0);
}

function getStorageToReducerKeysConfigs({reducerStorageTypeMap, storageMap}) {
    const initialValue = [];

    return Object.keys(reducerStorageTypeMap)
        .reduce(
            (accumulator, reducerkey) => {
                const storageType = reducerStorageTypeMap[reducerkey];

                let storageConfig = accumulator.find((config) => config.storageType === storageType);

                if (!storageConfig) {
                    storageConfig = {
                        storageType,
                        storage: getOrAddStorage({storageMap, storageType}),
                        reducerKeys: []
                    };

                    accumulator.push(storageConfig);
                }

                storageConfig.reducerKeys.push(reducerkey);

                return accumulator;
            },
            initialValue
        );
}

function getOrAddStorage({storageMap, storageType}) {
    if (Object.prototype.hasOwnProperty.call(storageMap, storageType)) {
        return storageMap[storageType];
    }

    const storage = browserStorageFactory.create(storageType);

    // eslint-disable-next-line no-param-reassign
    storageMap[storageType] = storage;

    return storage;
}

function joinStoredStateWithMissingPropsThatPossiblyWereNewlyAddedInTheReducers(storedState) {
    // TODO also remove the top reducer props that do not occur anymore in the combined initial state?

    // 2nd source takes precedence above the 1st source
    return mergeObjectPropsDeeply(getCombinedInitialState(), storedState);
}
