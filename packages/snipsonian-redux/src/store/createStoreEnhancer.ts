import assert from '../../../snipsonian-core/src/assert';
import isSet from '../../../snipsonian-core/src/is/isSet';
import isString from '../../../snipsonian-core/src/is/isString';
import mergeObjectPropsDeeply from '../../../snipsonian-core/src/merge/mergeObjectPropsDeeply';
import browserStorageFactory from '../../../snipsonian-browser/src/storage/browserStorageFactory';
import getStateStorageMiddlewareFactory, {
    IStateStorage,
    TOnMiddlewareError,
} from '../middleware/getStateStorageMiddlewareFactory';
import getStateStorageByReducerMiddlewareFactory, {
    IStorageToReducerKeysConfig,
} from '../middleware/getStateStorageByReducerMiddlewareFactory';
import {
    getCombinedInitialState,
    areThereReducersWithoutStorageTypeInherit,
    areThereReducersThatHaveToBeStoredSpecifically,
    getMapOfReducersThatHaveToBeStoredSpecifically,
    getReducerKeyToTransformReducerStateMap,
    IMapOfReducersThatHaveToBeStoredSpecifically,
} from '../reducer/reducerManager';
import { STATE_STORAGE_TYPE } from '../config/storageType';
import STORAGE_TYPE from '../../../snipsonian-browser/src/storage/storageType';

interface IStorageMap {
    [storageType: string]: IStateStorage;
}

export interface IStoreEnhancerConfig {
    middlewares?: any[]; // TODO better middleware typing?
    stateStorageType?: STATE_STORAGE_TYPE;
    stateStorageKey?: string;
    customStorage?: IStateStorage;
    shouldCatchStorageErrors?: boolean;
    onStorageError?: TOnMiddlewareError;
}

export default function createStoreEnhancer({
    middlewares = [],
    stateStorageType = STATE_STORAGE_TYPE.NO_STORAGE,
    stateStorageKey,
    customStorage,
    shouldCatchStorageErrors = false,
    onStorageError,
}: IStoreEnhancerConfig) {
    if (shouldCatchStorageErrors) {
        assert(onStorageError, isSet, 'Missing onError. Needed because shouldCatchStorageErrors is true.');
    }

    let preloadedState = {};

    const storageMap: IStorageMap = {};

    if (customStorage) {
        storageMap[STATE_STORAGE_TYPE.CUSTOM] = customStorage;
    }

    let stateStorageMiddlewareFactory;

    if (stateStorageType !== STATE_STORAGE_TYPE.NO_STORAGE) {
        assertStateStorageKey({
            stateStorageKey,
            // tslint:disable-next-line:max-line-length
            errorMessage: `The stateStorageKey input {val} should be a valid string when stateStorageType is not ${STATE_STORAGE_TYPE.NO_STORAGE}`,
        });

        if (!areThereReducersWithoutStorageTypeInherit()) {
            const storage = getOrAddStorage({ storageMap, storageType: stateStorageType });

            stateStorageMiddlewareFactory = getStateStorageMiddlewareFactory({
                storage,
                stateStorageKey,
                shouldCatchErrors: shouldCatchStorageErrors,
                onError: onStorageError,
                reducerKeyToTransformReducerStateMap: getReducerKeyToTransformReducerStateMap(),
            });
        }
    }

    if ((stateStorageType !== STATE_STORAGE_TYPE.NO_STORAGE && areThereReducersWithoutStorageTypeInherit())
        || areThereReducersThatHaveToBeStoredSpecifically()) {
        assertStateStorageKey({
            stateStorageKey,
            errorMessage: 'The stateStorageKey input {val} should be a valid string when at least one reducer has ' +
                'a specific reducerStorageType',
        });

        const reducerStorageTypeMap = getMapOfReducersThatHaveToBeStoredSpecifically({ stateStorageType });

        const storageToReducerKeysConfigs = getStorageToReducerKeysConfigs({ reducerStorageTypeMap, storageMap });

        stateStorageMiddlewareFactory = getStateStorageByReducerMiddlewareFactory({
            storageToReducerKeysConfigs,
            stateStorageKey,
            shouldCatchErrors: shouldCatchStorageErrors,
            onError: onStorageError,
            reducerKeyToTransformReducerStateMap: getReducerKeyToTransformReducerStateMap(),
        });
    }

    if (stateStorageMiddlewareFactory) {
        middlewares.push(stateStorageMiddlewareFactory.createMiddleware());
        /* eslint-disable function-paren-newline */
        preloadedState = joinStoredStateWithMissingPropsThatPossiblyWereNewlyAddedInTheReducers(
            stateStorageMiddlewareFactory.getState(),
        );
        /* eslint-enable function-paren-newline */
    }

    return {
        preloadedState,
        middlewares,
    };
}

function assertStateStorageKey({ stateStorageKey, errorMessage }) {
    assert(
        stateStorageKey,
        isValidStorageKey,
        errorMessage,
    );
}

function isValidStorageKey(stateStorageKey) {
    return isSet(stateStorageKey) && isString(stateStorageKey) && (stateStorageKey.trim().length > 0);
}

function getStorageToReducerKeysConfigs({
    reducerStorageTypeMap,
    storageMap,
}: {
    reducerStorageTypeMap: IMapOfReducersThatHaveToBeStoredSpecifically;
    storageMap;
}): IStorageToReducerKeysConfig[] {
    const initialValue = [];

    return Object.keys(reducerStorageTypeMap)
        .reduce(
            (accumulator, reducerkey) => {
                const storageType = reducerStorageTypeMap[reducerkey];

                let storageConfig = accumulator.find((config) => config.storageType === storageType);

                if (!storageConfig) {
                    storageConfig = {
                        storageType,
                        storage: getOrAddStorage({ storageMap, storageType }),
                        reducerKeys: [],
                    };

                    accumulator.push(storageConfig);
                }

                storageConfig.reducerKeys.push(reducerkey);

                return accumulator;
            },
            initialValue,
        );
}

function getOrAddStorage({
    storageMap,
    storageType,
}: {
    storageMap: IStorageMap;
    storageType: STATE_STORAGE_TYPE;
}): IStateStorage {
    if (Object.prototype.hasOwnProperty.call(storageMap, storageType)) {
        return storageMap[storageType];
    }

    const browserStorageType: unknown = storageType;
    const storage = browserStorageFactory.create(browserStorageType as STORAGE_TYPE);

    // eslint-disable-next-line no-param-reassign
    storageMap[storageType] = storage;

    return storage;
}

function joinStoredStateWithMissingPropsThatPossiblyWereNewlyAddedInTheReducers(storedState) {
    // TODO also remove the top reducer props that do not occur anymore in the combined initial state?

    // 2nd source takes precedence above the 1st source
    return mergeObjectPropsDeeply(getCombinedInitialState(), storedState);
}
