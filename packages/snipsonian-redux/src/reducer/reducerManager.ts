import assert from '@snipsonian/core/src/assert';
import isSet from '@snipsonian/core/src/is/isSet';
import createReducer, { ICreateReducerConfig, TReducer } from './createReducer';
import { STATE_STORAGE_TYPE, REDUCER_STORAGE_TYPE } from '../config/storageType';

export type TTransformReducerStateForStorage<ReducerState> = (reducerState: ReducerState) => ReducerState;

export interface IProvidedReducerConfig<ReducerState> {
    key: string;
    reducerStorageType?: REDUCER_STORAGE_TYPE;
    transformReducerStateForStorage?: TTransformReducerStateForStorage<ReducerState>;
}

export interface IReducerConfig<ReducerState> extends
    IProvidedReducerConfig<ReducerState>,
    Pick<
        ICreateReducerConfig<ReducerState>,
        'initialState' | 'actionHandlers'
    > {}

export interface IReducers {
    [reducerKey: string]: TReducer<{}>;
}

const reducerConfigs: IReducerConfig<{}>[] = [];
const registeredReducers: IReducers = {};

const KEEP_REDUCER_STATE_AS_IS: TTransformReducerStateForStorage<{}> = (reducerState) => reducerState;

export function registerReducer<ReducerState = {}>({
    key,
    initialState = ({} as ReducerState),
    actionHandlers = {},
    reducerStorageType = REDUCER_STORAGE_TYPE.INHERIT,
    transformReducerStateForStorage = (KEEP_REDUCER_STATE_AS_IS as TTransformReducerStateForStorage<ReducerState>),
}: IReducerConfig<ReducerState>): TReducer<ReducerState> {
    assert(key, isSet, 'Invalid key {val}');
    assert(key, isReducerKeyUnique, 'There is already another reducer registered with the key {val}');

    reducerConfigs.push({
        key,
        initialState,
        actionHandlers,
        reducerStorageType,
        transformReducerStateForStorage,
    });

    registeredReducers[key] = createReducer({
        initialState,
        actionHandlers,
    });

    return registeredReducers[key] as TReducer<ReducerState>;
}

export function registerStorageTypeForProvidedReducer<ReducerState = {}>({
    key,
    reducerStorageType = REDUCER_STORAGE_TYPE.INHERIT,
    transformReducerStateForStorage = (KEEP_REDUCER_STATE_AS_IS as TTransformReducerStateForStorage<ReducerState>),
}: IProvidedReducerConfig<ReducerState>) {
    assert(key, isSet, 'Invalid key {val}');
    assert(key, isReducerKeyUnique, 'There is already another reducer registered with the key {val}');

    reducerConfigs.push({
        key,
        reducerStorageType,
        transformReducerStateForStorage,
    });
}

export function getRegisteredReducers() {
    return registeredReducers;
}

export function getCombinedInitialState() {
    const initialValue = {};

    return reducerConfigs
        .reduce(
            (accumulator, reducerConfig) => {
                // redux-first-router needs initial state to be undefined. TBD why.
                const initialStateCopy = typeof reducerConfig.initialState === 'undefined' ?
                    undefined : Object.assign({}, reducerConfig.initialState);
                // eslint-disable-next-line no-param-reassign
                accumulator[reducerConfig.key] = initialStateCopy;

                return accumulator;
            },
            initialValue,
        );
}

export function areThereReducersWithoutStorageTypeInherit() {
    return reducerConfigs
        .some(hasNotStorageTypeInherit);
}

export function areThereReducersThatHaveToBeStoredSpecifically() {
    return reducerConfigs
        .some((reducerConfig) => hasNotStorageTypeInherit(reducerConfig) && hasNotStorageTypeNoStorage(reducerConfig));
}

export interface IMapOfReducersThatHaveToBeStoredSpecifically {
    [reducerKey: string]: STATE_STORAGE_TYPE;
}

export function getMapOfReducersThatHaveToBeStoredSpecifically({
    stateStorageType,
}: {
    stateStorageType: STATE_STORAGE_TYPE;
}): IMapOfReducersThatHaveToBeStoredSpecifically {
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
            initialValue,
        );
}

export interface IReducerKeyToTransformReducerStateMap {
    [reducerKey: string]: TTransformReducerStateForStorage<any>;
}

export function getReducerKeyToTransformReducerStateMap(): IReducerKeyToTransformReducerStateMap {
    return reducerConfigs
        .reduce(
            (mapAccumulator, reducerConfig) => {
                // eslint-disable-next-line no-param-reassign
                mapAccumulator[reducerConfig.key] = reducerConfig.transformReducerStateForStorage;
                return mapAccumulator;
            },
            {},
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
