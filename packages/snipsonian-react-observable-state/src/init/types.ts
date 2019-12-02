import React from 'react';
import { IObservableStateStore } from '@snipsonian/observable-state/src/store/types';
import { IActionableObservableStateStore } from '@snipsonian/observable-state/src/actionableStore/types';

interface IReactObservableStateBase<
    State,
    StateChangeNotificationKey,
    StateStore = IObservableStateStore<State, StateChangeNotificationKey>> {
    // eslint-disable-next-line max-len
    ObservableStateProvider: React.ProviderExoticComponent<React.ProviderProps<StateStore>>;
}

interface IObservePropsBase<State, StateChangeNotificationKey, PrivateProps, PublicProps> {
    /* state change notifications that will be observed */
    notifications: StateChangeNotificationKey[];
    select?: (props: IObserveSelectProps<State, PublicProps>) => Partial<PrivateProps>;
}

/* "Standard" react observable state */

export interface IReactObservableState<State, StateChangeNotificationKey>
    extends IReactObservableStateBase<State, StateChangeNotificationKey> {
    observe: <PrivateProps, PublicProps = {}>(
        props: IObserveProps<State, StateChangeNotificationKey, PrivateProps, PublicProps>,
        WrappedComponent: React.ElementType,
    ) => () => JSX.Element;
}

export interface IObserveProps<State, StateChangeNotificationKey, PrivateProps, PublicProps>
    extends IObservePropsBase<State, StateChangeNotificationKey, PrivateProps, PublicProps> {
    set?: (props: IObserveSetProps<State, StateChangeNotificationKey, PublicProps>) => Partial<PrivateProps>;
}

export interface IObserveSelectProps<State, PublicProps> {
    state: State;
    publicProps?: PublicProps;
}

export interface IObserveSetProps<State, StateChangeNotificationKey, PublicProps>
    extends Pick<IObservableStateStore<State, StateChangeNotificationKey>, 'getState' | 'setState'> {
    publicProps?: PublicProps;
}

/* "Actionable" react observable state */

export interface IActionableReactObservableState<State, StateChangeNotificationKey>
    // eslint-disable-next-line max-len
    extends IReactObservableStateBase<State, StateChangeNotificationKey, IActionableObservableStateStore<State, StateChangeNotificationKey>> {
    observe: <PrivateProps, PublicProps = {}>(
        props: IActionableObserveProps<State, StateChangeNotificationKey, PrivateProps, PublicProps>,
        WrappedComponent: React.ElementType,
    ) => () => JSX.Element;
}

export interface IActionableObserveProps<State, StateChangeNotificationKey, PrivateProps, PublicProps>
    extends IObservePropsBase<State, StateChangeNotificationKey, PrivateProps, PublicProps> {
    // eslint-disable-next-line max-len
    set?: (props: IActionableObserveSetProps<State, StateChangeNotificationKey, PublicProps>) => Partial<PrivateProps>;
}

export interface IActionableObserveSetProps<State, StateChangeNotificationKey, PublicProps>
    extends Pick<IActionableObservableStateStore<State, StateChangeNotificationKey>, 'getState' | 'dispatch'> {
    publicProps?: PublicProps;
}
