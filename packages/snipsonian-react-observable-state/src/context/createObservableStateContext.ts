import * as React from 'react';
import { IObservableStateStore } from '@snipsonian/observable-state/src/store/types';

export default function createObservableStateContext<
    State,
    StateChangeNotificationKey,
    StateStore = IObservableStateStore<State, StateChangeNotificationKey>>(): React.Context<StateStore> {
    return React.createContext<StateStore>(
        null,
    );
}
