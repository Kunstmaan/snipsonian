import createStateObserverManager from '../observer/createStateObserverManager';
import { determineInitialState, saveStateToStorage } from './stateStorage';
import { IObservableStateStore, IObservableStateStoreConfig, ISetStateProps, ISetStateContext } from './types';
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

    const store = {
        getState: () => state,
        setState: ({
            newState,
            notificationsToTrigger,
            context,
        }: ISetStateProps<State, StateChangeNotificationKey>) => {
            const prevState = state;
            const stateToSet = config.onBeforeStateUpdate
                ? config.onBeforeStateUpdate({ prevState, newState })
                : newState;

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

            observerManager.notifyObserversOfStateChanges(notificationsToTrigger);
        },
        registerObserver: observerManager.registerObserver,
        unRegisterObserver: observerManager.unRegisterObserver,
    };

    registerStore<State, StateChangeNotificationKey>(store);

    return store;
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
