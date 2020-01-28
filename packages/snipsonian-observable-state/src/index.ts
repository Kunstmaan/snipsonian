/**
 * Utilities to detect changes in a large state store
 */
import createObservableStateStoreIntern from './store/createObservableStateStore';
import createActionableObservableStateStoreIntern from './actionableStore/createActionableObservableStateStore';

export const createObservableStateStore = createObservableStateStoreIntern;
export const createActionableObservableStateStore = createActionableObservableStateStoreIntern;
