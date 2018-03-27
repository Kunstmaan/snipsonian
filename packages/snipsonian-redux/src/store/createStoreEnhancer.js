import assert from '../../../snipsonian-core/src/assert';
import isSet from '../../../snipsonian-core/src/is/isSet';
import isString from '../../../snipsonian-core/src/is/isString';
import mergeObjectPropsDeeply from '../../../snipsonian-core/src/merge/mergeObjectPropsDeeply';
import browserStorageFactory from '../../../snipsonian-browser/src/storage/browserStorageFactory';
import getStateStorageMiddlewareFactory from '../middleware/getStateStorageMiddlewareFactory';
import getStateStorageByReducerMiddlewareFactory from '../middleware/getStateStorageByReducerMiddlewareFactory';
import {
    getCombinedInitialState,
    areThereReducersWithoutStorageTypeInherit,
    areThereReducersThatHaveToBeStoredSpecifically,
    getMapOfReducersThatHaveToBeStoredSpecifically
} from '../reducer/reducerManager';
import {STATE_STORAGE_TYPE} from '../config/storageType';

export default function createStoreEnhancer({
    middlewares = [],
    stateStorageType = STATE_STORAGE_TYPE.NO_STORAGE,
    stateStorageKey,
    customStorageMap = {},
    shouldCatchStorageErrors,
    onStorageError
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
                stateStorageKey,
                shouldCatchErrors: shouldCatchStorageErrors,
                onError: onStorageError
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
            stateStorageKey,
            shouldCatchErrors: shouldCatchStorageErrors,
            onError: onStorageError
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
    return isSet(stateStorageKey) && isString(stateStorageKey) && (stateStorageKey.trim().length > 0);
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
