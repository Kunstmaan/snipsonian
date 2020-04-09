import isFunction from '@snipsonian/core/src/is/isFunction';
import createStateObserverManager from '../observer/createStateObserverManager';
import {
    DEFAULT_NR_OF_PARENT_NOTIFICATION_LEVELS_TO_TRIGGER,
    DEFAULT_PARENT_NOTIFICATIONS_DELIMITER,
} from '../observer/extendNotificationsToTrigger';
import { determineInitialState, saveStateToStorage } from './stateStorage';
import {
    IObservableStateStore,
    IObservableStateStoreConfig,
    ISetStateProps,
    ISetStateContext,
    TNewState,
    TToNewState,
} from './types';
import { registerStore } from './storeManager';

const LOG_GROUP_LABEL_PREFIX = 'state-change';
const IS_LOG_GROUPING_SUPPORTED = console.group;

export default function createObservableStateStore<State, StateChangeNotificationKey = string>(
    config: IObservableStateStoreConfig<State>,
): IObservableStateStore<State, StateChangeNotificationKey> {
    let state = determineInitialState<State>({
        initialState: config.initialState,
        stateStorageConfig: config.storage,
    });
    const observerManager = createStateObserverManager<StateChangeNotificationKey>();

    const {
        nrOfLevels: defaultNrOfParentNotificationLevelsToTrigger = DEFAULT_NR_OF_PARENT_NOTIFICATION_LEVELS_TO_TRIGGER,
        notificationDelimiter: defaultParentNotificationsDelimiter = DEFAULT_PARENT_NOTIFICATIONS_DELIMITER,
    } = config.triggerParentNotifications || {};

    const store = {
        getState: () => state,
        setState: ({
            newState,
            notificationsToTrigger,
            context,
            nrOfParentNotificationLevelsToTrigger = defaultNrOfParentNotificationLevelsToTrigger,
        }: ISetStateProps<State, StateChangeNotificationKey>) => {
            const prevState = state;

            let stateToSet = isToNewState<State>(newState)
                ? newState(prevState)
                : newState;

            if (config.onBeforeStateUpdate) {
                stateToSet = config.onBeforeStateUpdate({ prevState, newState: stateToSet });
            }

            state = stateToSet;

            if (config.logStateUpdates || config.logNotifiedObserverNames) {
                logGroupStart(determineLogGroupLabel(context));
                if (context && context.info) {
                    console.log('context', context.info);
                }
                if (config.logStateUpdates) {
                    console.log('next state', state);
                }
                if (config.logNotifiedObserverNames) {
                    console.log('notifications', notificationsToTrigger);
                }
                logGroupEnd();
            }

            saveStateToStorage<State>({
                state,
                stateStorageConfig: config.storage,
            });

            if (config.onAfterStateUpdate) {
                config.onAfterStateUpdate({ prevState, newState: stateToSet });
            }

            observerManager.notifyObserversOfStateChanges({
                notificationsToTrigger,
                triggerParentNotifications: {
                    nrOfLevels: nrOfParentNotificationLevelsToTrigger,
                    notificationDelimiter: defaultParentNotificationsDelimiter,
                },
            });
        },
        registerObserver: observerManager.registerObserver,
        unRegisterObserver: observerManager.unRegisterObserver,
    };

    registerStore<State, StateChangeNotificationKey>(store);

    return store;
}

function isToNewState<State>(newState: TNewState<State>): newState is TToNewState<State> {
    return isFunction(newState);
}

function determineLogGroupLabel(context?: ISetStateContext): string {
    if (context) {
        return `${LOG_GROUP_LABEL_PREFIX}: ${context.title}`;
    }

    return LOG_GROUP_LABEL_PREFIX;
}

function logGroupStart(title: string): void {
    if (IS_LOG_GROUPING_SUPPORTED) {
        console.groupCollapsed(title);
    } else {
        console.log(`[${title}]`);
    }
}

function logGroupEnd(): void {
    if (IS_LOG_GROUPING_SUPPORTED) {
        console.groupEnd();
    }
}
