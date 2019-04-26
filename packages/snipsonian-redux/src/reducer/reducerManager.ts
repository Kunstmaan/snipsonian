import assert from '@snipsonian/core/src/assert';
import isSet from '@snipsonian/core/src/is/isSet';
import createReducer, { IActionHandlers, ICreateReducerConfig, TReducer } from './createReducer';
import { STATE_STORAGE_TYPE, REDUCER_STORAGE_TYPE } from '../config/storageType';
import { createActionHandler } from './createActionHandler';

export type TTransformReducerStateForStorage<ReducerState> = (reducerState: ReducerState) => Partial<ReducerState>;

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
    > {
    actionTypeToResetState?: string; // if provided, an action handler will be added automatically that will reset the reducer state to the initialState on receiving this action
}

export interface IReducers {
    [reducerKey: string]: TReducer<{}>;
}

const reducerConfigs: IReducerConfig<{}>[] = [];
let registeredReducers: IReducers = {};

const KEEP_REDUCER_STATE_AS_IS: TTransformReducerStateForStorage<{}> = (reducerState: object): object => reducerState;

export function registerReducer<ReducerState = {}>({
    key,
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    initialState = ({} as ReducerState),
    actionHandlers = {},
    reducerStorageType = REDUCER_STORAGE_TYPE.INHERIT,
    transformReducerStateForStorage = (KEEP_REDUCER_STATE_AS_IS as unknown as TTransformReducerStateForStorage<ReducerState>),
    actionTypeToResetState,
}: IReducerConfig<ReducerState>): TReducer<ReducerState> {
    assert(key, isSet, 'Invalid key {val}');
    assert(key, isReducerKeyUnique, 'There is already another reducer registered with the key {val}');

    reducerConfigs.push({
        key,
        initialState,
        actionHandlers: conditionallyAddActionHandlerToResetState({
            actionTypeToResetState,
            actionHandlers,
            initialState,
        }),
        reducerStorageType,
        transformReducerStateForStorage:
            transformReducerStateForStorage as unknown as TTransformReducerStateForStorage<{}>,
    });

    const reducer = createReducer({
        initialState,
        actionHandlers,
    });

    registeredReducers[key] = reducer as unknown as TReducer<{}>;

    return reducer;
}

export function registerStorageTypeForProvidedReducer<ReducerState = {}>({
    key,
    reducerStorageType = REDUCER_STORAGE_TYPE.INHERIT,
    transformReducerStateForStorage = (KEEP_REDUCER_STATE_AS_IS as unknown as TTransformReducerStateForStorage<ReducerState>),
}: IProvidedReducerConfig<ReducerState>): void {
    assert(key, isSet, 'Invalid key {val}');
    assert(key, isReducerKeyUnique, 'There is already another reducer registered with the key {val}');

    reducerConfigs.push({
        key,
        reducerStorageType,
        transformReducerStateForStorage:
            transformReducerStateForStorage as unknown as TTransformReducerStateForStorage<{}>,
    });
}

export function getRegisteredReducers(): IReducers {
    return registeredReducers;
}

/**
 * Can be useful for test purposes.
 */
export function clearRegisteredReducers(): void {
    registeredReducers = {};
}

export function getCombinedInitialState(): object {
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

export function areThereReducersWithoutStorageTypeInherit(): boolean {
    return reducerConfigs
        .some(hasNotStorageTypeInherit);
}

export function areThereReducersThatHaveToBeStoredSpecifically(): boolean {
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

                function addReducerToMap(storageType: string): void {
                    // eslint-disable-next-line no-param-reassign
                    accumulator[reducerConfig.key] = storageType;
                }

                return accumulator;
            },
            initialValue,
        );
}

export interface IReducerKeyToTransformReducerStateMap {
    [reducerKey: string]: TTransformReducerStateForStorage<{}>;
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

function findReducerConfig(key: string): IReducerConfig<{}> {
    return reducerConfigs
        .find((reducerConfig) => reducerConfig.key === key);
}

function isReducerKeyUnique(key: string): boolean {
    return typeof findReducerConfig(key) === 'undefined';
}

function hasStorageTypeInherit(reducerConfig: IReducerConfig<{}>): boolean {
    return reducerConfig.reducerStorageType === REDUCER_STORAGE_TYPE.INHERIT;
}

function hasNotStorageTypeInherit(reducerConfig: IReducerConfig<{}>): boolean {
    return !hasStorageTypeInherit(reducerConfig);
}

function hasNotStorageTypeNoStorage(reducerConfig: IReducerConfig<{}>): boolean {
    return reducerConfig.reducerStorageType !== REDUCER_STORAGE_TYPE.NO_STORAGE;
}

function conditionallyAddActionHandlerToResetState<ReducerState>({
    actionTypeToResetState,
    actionHandlers,
    initialState,
}: { actionTypeToResetState?: string } & ICreateReducerConfig<ReducerState>): IActionHandlers<{}> {
    if (actionTypeToResetState && noActionHandlerForType(actionTypeToResetState, actionHandlers)) {
        const initialStateActionHandler = createActionHandler(() => {
            return {
                ...initialState,
            };
        });

        actionHandlers[actionTypeToResetState] = initialStateActionHandler;
    }

    return actionHandlers as unknown as IActionHandlers<{}>;
}

export function noActionHandlerForType<ReducerState>(actionType: string, actionHandlers: IActionHandlers<ReducerState>) {
    return !actionHandlers[actionType];
}
