import { IStateObserverManager } from '../observer/createStateObserverManager';
import { IStateStorageConfig } from './stateStorage';

export interface IObservableStateStore<State, StateChangeNotificationKey>
    extends Pick<IStateObserverManager<StateChangeNotificationKey>, 'registerObserver' | 'unRegisterObserver'> {
    getState: IGetState<State>;
    setState: ISetState<State, StateChangeNotificationKey>;
}

export interface IGetState<State> {
    (): State;
}

export interface ISetState<State, StateChangeNotificationKey> {
    (props: ISetStateProps<State, StateChangeNotificationKey>): void;
}

export interface ISetStateProps<State, StateChangeNotificationKey> {
    newState: State;
    notificationsToTrigger?: StateChangeNotificationKey[];
    /* optional string or object (think 'action') to indicate the context of the state change
       which can be handy for logging or debugging */
    context?: ISetStateContext;
}

export interface ISetStateContext {
    title: string;
    info?: object;
}

export interface IObservableStateStoreConfig<State> {
    initialState: State;
    logStateUpdates?: boolean; // default false
    logNotifiedObserverNames?: boolean; // default false
    storage?: IStateStorageConfig<State>;
    onBeforeStateUpdate?: (props: { prevState: State; newState: State }) => State;
    onAfterStateUpdate?: (props: { prevState: State; newState: State }) => void;
}
