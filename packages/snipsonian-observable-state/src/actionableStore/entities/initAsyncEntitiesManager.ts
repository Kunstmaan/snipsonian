import { ITraceableApiErrorBase } from '@snipsonian/core/src/typings/apiErrors';
import { IActionableObservableStateStore } from '../types';
import {
    AsyncOperation,
    IAsyncEntitiesManager,
    IAsyncEntity,
    IAsyncEntityKeyConfig,
    IAsyncEntityKeyConfigs,
    IAsyncEntityUpdaters,
    IEntitiesInitialState,
    IOperationUpdaterOptions,
    IRegisteredEntity,
    IRegisteredEntityAsyncTriggers,
    IRegisteredEntityUpdaters,
    IRegisterEntityProps,
    IWithKeyIndex,
    TEntityKey,
} from './types';
import { createAsyncEntityInitialState } from './createAsyncEntityInitialState';
import { ASYNC_OPERATION_2_ASYNC_ENTITY_UPDATERS } from './asyncEntityUpdaters';
import { initAsyncEntityActionCreators } from './asyncEntityActionCreators';
import { initAsyncEntityTriggers } from './asyncEntityTriggers';

export default function initAsyncEntitiesManager
// eslint-disable-next-line @typescript-eslint/ban-types
<State, StateChangeNotificationKey, ExtraProcessInput = {}, Error = ITraceableApiErrorBase<{}>, ActionType = string>({
    entitiesStateField = 'entities',
    getStore,
}: {
    entitiesStateField?: string;
    getStore: () => IActionableObservableStateStore<State, StateChangeNotificationKey>;
}): IAsyncEntitiesManager<State, StateChangeNotificationKey, Error> {
    const asyncEntityConfigs: IAsyncEntityKeyConfigs<Error> = {};
    let entitiesInitialState: IEntitiesInitialState = null;

    /* eslint-disable max-len */

    const asyncEntityActionCreators = initAsyncEntityActionCreators<State, ExtraProcessInput, StateChangeNotificationKey, Error, ActionType>({
        entitiesStateField,
        getEntitiesInitialState,
    });

    const asyncEntityTriggers = initAsyncEntityTriggers<State, ExtraProcessInput, StateChangeNotificationKey, Error, ActionType>({
        asyncEntityActionCreators,
        getStore,
    });

    return {
        // eslint-disable-next-line max-len
        registerEntity<Data>({
            asyncEntityKey,
            operations,
            initialData,
            includeUpdaters = false,
            notificationsToTrigger,
            nrOfParentNotificationLevelsToTrigger,
        }: IRegisterEntityProps<Data, StateChangeNotificationKey>): IRegisteredEntity<State, Data, StateChangeNotificationKey, Error> {
            const initialState = createAsyncEntityInitialState<Data, Error>({ operations, data: initialData });

            asyncEntityConfigs[asyncEntityKey] = {
                operations,
                initialState,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as unknown as IAsyncEntityKeyConfig<any, Error>;

            return {
                select: (state = getStore().getState()) => asyncEntityActionCreators.getAsyncEntity<Data>(state, asyncEntityKey),
                updaters: includeUpdaters ? initOperationUpdaters() : undefined,
                async: initAsyncTriggers(),
            };

            function updateThisEntityInState(
                entityUpdater: (currentEntity: IAsyncEntity<Data, Error>) => IAsyncEntity<Data, Error>,
                options: IOperationUpdaterOptions<StateChangeNotificationKey> = {},
            ) {
                return asyncEntityActionCreators.updateAsyncEntityInState<Data>({
                    asyncEntityKey,
                    entityUpdater,
                    options: {
                        notificationsToTrigger: options.notificationsToTrigger || notificationsToTrigger,
                        nrOfParentNotificationLevelsToTrigger: options.nrOfParentNotificationLevelsToTrigger || nrOfParentNotificationLevelsToTrigger,
                    },
                    setState: getStore().setState,
                });
            }

            function initOperationUpdaters() {
                return operations.reduce(
                    (accumulator, operation) => {
                        const operationUpdaters = ASYNC_OPERATION_2_ASYNC_ENTITY_UPDATERS[operation] as unknown as IAsyncEntityUpdaters<Data, Error>;

                        accumulator[operation] = {
                            trigger: (options) => updateThisEntityInState(
                                (entity) => operationUpdaters.trigger(entity, initialState.data),
                                options,
                            ),
                            triggerWithoutDataReset: (options) => updateThisEntityInState(
                                (entity) => operationUpdaters.triggerWithoutDataReset(entity),
                                options,
                            ),
                            succeeded: (data, options) => updateThisEntityInState(
                                (entity) => operationUpdaters.succeeded(entity, data),
                                options,
                            ),
                            succeededWithoutDataSet: (options) => updateThisEntityInState(
                                (entity) => operationUpdaters.succeededWithoutDataSet(entity),
                                options,
                            ),
                            failed: (error, options) => updateThisEntityInState(
                                (entity) => operationUpdaters.failed(entity, error),
                                options,
                            ),
                            cancel: (options) => updateThisEntityInState(
                                (entity) => operationUpdaters.cancel(entity),
                                options,
                            ),
                            reset: (options) => updateThisEntityInState(
                                (entity) => operationUpdaters.reset(entity, initialState.data),
                                options,
                            ),
                            resetWithoutDataReset: (options) => updateThisEntityInState(
                                (entity) => operationUpdaters.resetWithoutDataReset(entity),
                                options,
                            ),
                        };

                        return accumulator;
                    },
                    {} as IRegisteredEntityUpdaters<Data, StateChangeNotificationKey, Error>,
                );
            }

            function initAsyncTriggers() {
                return operations.reduce(
                    (accumulator, operation) => {
                        if (operation === AsyncOperation.fetch) {
                            accumulator.fetch = ({
                                notificationsToTrigger: specificNotificationsToTrigger,
                                nrOfParentNotificationLevelsToTrigger: specificNrOfParentNotificationLevelsToTrigger,
                                ...other
                            }) => asyncEntityTriggers.fetch({
                                asyncEntityKey,
                                notificationsToTrigger: specificNotificationsToTrigger || notificationsToTrigger,
                                nrOfParentNotificationLevelsToTrigger: specificNrOfParentNotificationLevelsToTrigger || nrOfParentNotificationLevelsToTrigger,
                                ...other,
                            });
                        } else if (operation === AsyncOperation.create) {
                            accumulator.create = ({
                                notificationsToTrigger: specificNotificationsToTrigger,
                                nrOfParentNotificationLevelsToTrigger: specificNrOfParentNotificationLevelsToTrigger,
                                ...other
                            }) => asyncEntityTriggers.create({
                                asyncEntityKey,
                                notificationsToTrigger: specificNotificationsToTrigger || notificationsToTrigger,
                                nrOfParentNotificationLevelsToTrigger: specificNrOfParentNotificationLevelsToTrigger || nrOfParentNotificationLevelsToTrigger,
                                ...other,
                            });
                        } else if (operation === AsyncOperation.update) {
                            accumulator.update = ({
                                notificationsToTrigger: specificNotificationsToTrigger,
                                nrOfParentNotificationLevelsToTrigger: specificNrOfParentNotificationLevelsToTrigger,
                                ...other
                            }) => asyncEntityTriggers.update({
                                asyncEntityKey,
                                notificationsToTrigger: specificNotificationsToTrigger || notificationsToTrigger,
                                nrOfParentNotificationLevelsToTrigger: specificNrOfParentNotificationLevelsToTrigger || nrOfParentNotificationLevelsToTrigger,
                                ...other,
                            });
                        } else if (operation === AsyncOperation.remove) {
                            accumulator.remove = ({
                                notificationsToTrigger: specificNotificationsToTrigger,
                                nrOfParentNotificationLevelsToTrigger: specificNrOfParentNotificationLevelsToTrigger,
                                ...other
                            }) => asyncEntityTriggers.remove({
                                asyncEntityKey,
                                notificationsToTrigger: specificNotificationsToTrigger || notificationsToTrigger,
                                nrOfParentNotificationLevelsToTrigger: specificNrOfParentNotificationLevelsToTrigger || nrOfParentNotificationLevelsToTrigger,
                                ...other,
                            });
                        }

                        return accumulator;
                    },
                    {} as IRegisteredEntityAsyncTriggers<State, Data, StateChangeNotificationKey>,
                );
            }
        },

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getAsyncEntityConfig<Data = any>({
            asyncEntityKey,
        }: {
            asyncEntityKey: TEntityKey;
        }): IAsyncEntityKeyConfig<Data, Error> {
            return asyncEntityConfigs[asyncEntityKey];
        },

        getEntitiesInitialState,
    };

    /* eslint-enable max-len */

    function getEntitiesInitialState(): IEntitiesInitialState {
        if (!entitiesInitialState) {
            entitiesInitialState = Object.keys(asyncEntityConfigs)
                .reduce(
                    (accumulator, asyncEntityKey) => {
                        const asyncEntityKeyConfig = asyncEntityConfigs[asyncEntityKey];
                        (accumulator as IWithKeyIndex)[asyncEntityKey] = asyncEntityKeyConfig.initialState;
                        return accumulator;
                    },
                    {} as IEntitiesInitialState,
                );
        }

        return entitiesInitialState;
    }
}
