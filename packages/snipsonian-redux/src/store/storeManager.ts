/**
 * You can get the store, after it has been configured, from here to avoid circular dependencies.
 */

import { Store } from 'redux';

let registeredStore: Store;

export function registerStore(store: Store): void {
    registeredStore = store;
}

export function getRegisteredStore<State>(): Store<State> {
    return registeredStore as Store<State>;
}
