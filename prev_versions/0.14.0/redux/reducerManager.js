import {is, assert} from '../index';
import createReducer from './createReducer';
import {STATE_STORAGE_TYPE, REDUCER_STORAGE_TYPE} from './storageType';

const reducerConfigs = [];

const registeredReducers = {};

export function registerReducer({
    key,
    initialState = {},
    actionHandlers = {},
    reducerStorageType = REDUCER_STORAGE_TYPE.INHERIT
}) {
    assert(key, is.set, 'Invalid key {val}');
    assert(key, isReducerKeyUnique, 'There is already another reducer registered with the key {val}');

    reducerConfigs.push({
        key,
        initialState,
        actionHandlers,
        reducerStorageType
    });

    registeredReducers[key] = createReducer({
        initialState,
        actionHandlers
    });

    return registeredReducers[key];
}

export function registerProvidedReducer({
    key,
    reducer,
    reducerStorageType = REDUCER_STORAGE_TYPE.INHERIT
}) {
    assert(key, is.set, 'Invalid key {val}');
    assert(key, isReducerKeyUnique, 'There is already another reducer registered with the key {val}');

    reducerConfigs.push({
        key,
        initialState: {},
        reducerStorageType
    });

    registeredReducers[key] = reducer;

    return registeredReducers[key];
}

export function getRegisteredReducers() {
    return registeredReducers;
}

export function getCombinedInitialState() {
    const initialValue = {};

    return reducerConfigs
        .reduce(
            (accumulator, reducerConfig) => {
                // eslint-disable-next-line no-param-reassign
                accumulator[reducerConfig.key] = reducerConfig.initialState;
                return accumulator;
            },
            initialValue
        );
}

export function areThereReducersWithoutStorageTypeInherit() {
    return reducerConfigs
        .some(hasNotStorageTypeInherit);
}

export function areThereReducersThatHaveToBeStoredSpecifically() {
    return reducerConfigs
        .some((reducerConfig) =>
            hasNotStorageTypeInherit(reducerConfig)
            && hasNotStorageTypeNoStorage(reducerConfig)
        );
}

export function getMapOfReducersThatHaveToBeStoredSpecifically({stateStorageType}) {
    const initialValue = {};

    return reducerConfigs
        .reduce(
            (accumulator, reducerConfig) => {
                if (stateStorageType === STATE_STORAGE_TYPE.NO_STORAGE) {
                    if (hasNotStorageTypeInherit(reducerConfig)
                        && hasNotStorageTypeNoStorage(reducerConfig)) {
                        addReducerToMap(reducerConfig.reducerStorageType);
                    }
                } else if (hasStorageTypeInherit(reducerConfig)) {
                    addReducerToMap(stateStorageType);
                } else if (hasNotStorageTypeNoStorage(reducerConfig)) {
                    addReducerToMap(reducerConfig.reducerStorageType);
                }

                function addReducerToMap(storageType) {
                    // eslint-disable-next-line no-param-reassign
                    accumulator[reducerConfig.key] = storageType;
                }

                return accumulator;
            },
            initialValue
        );
}

function findReducerConfig(key) {
    return reducerConfigs
        .find((reducerConfig) => reducerConfig.key === key);
}

function isReducerKeyUnique(key) {
    return typeof findReducerConfig(key) === 'undefined';
}

function hasStorageTypeInherit(reducerConfig) {
    return reducerConfig.reducerStorageType === REDUCER_STORAGE_TYPE.INHERIT;
}

function hasNotStorageTypeInherit(reducerConfig) {
    return !hasStorageTypeInherit(reducerConfig);
}

function hasNotStorageTypeNoStorage(reducerConfig) {
    return reducerConfig.reducerStorageType !== REDUCER_STORAGE_TYPE.NO_STORAGE;
}