/**
 * You can get the store, after it has been configured, from here to avoid circular dependencies.
 */

import { IObservableStateStore } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */

let registeredStore: IObservableStateStore<object, any>;

export function registerStore<State, StateChangeNotificationKey>(
    store: IObservableStateStore<State, StateChangeNotificationKey>,
): void {
    registeredStore = store as unknown as IObservableStateStore<object, any>;
}

/* eslint-enable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line max-len
export function getRegisteredStore<State, StateChangeNotificationKey>(): IObservableStateStore<State, StateChangeNotificationKey> {
    return registeredStore as unknown as IObservableStateStore<State, StateChangeNotificationKey>;
}
