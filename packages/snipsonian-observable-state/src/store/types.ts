import { IStateObserverManager } from '../observer/createStateObserverManager';
import { IStateStorageConfig } from './stateStorage';
import {
    ITriggerParentNotifications,
    TNrOfParentNotificationLevelsToTrigger,
} from '../observer/extendNotificationsToTrigger';

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
    newState: TNewState<State>;
    notificationsToTrigger?: StateChangeNotificationKey[];
    /* optional number (or false) to override - only in this state change instance - the similar number
       that is set while creating the observable state store */
    nrOfParentNotificationLevelsToTrigger?: TNrOfParentNotificationLevelsToTrigger;
    /* optional string or object (think 'action') to indicate the context of the state change
       which can be handy for logging or debugging */
    context?: ISetStateContext;
}

export type TNewState<State> = State | TToNewState<State>;

export type TToNewState<State> = (currentState: State) => State;

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
    triggerParentNotifications?: ITriggerParentNotifications;
}
