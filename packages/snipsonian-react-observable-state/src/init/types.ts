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

interface IObservePropsBase<StateChangeNotificationKey> {
    /* state change notifications that will be observed */
    notifications: StateChangeNotificationKey[];
}

/* "Standard" react observable state */

export interface IReactObservableState<State, StateChangeNotificationKey>
    extends IReactObservableStateBase<State, StateChangeNotificationKey> {
    observe: <PublicProps = object>(
        notifications: StateChangeNotificationKey[],
        WrappedComponent: React.ElementType,
    ) => React.ElementType<PublicProps>;
    observeXL: <PrivateProps = IStoreForComp<State, StateChangeNotificationKey>, PublicProps = object>(
        props: IObserveProps<State, StateChangeNotificationKey, PrivateProps, PublicProps>,
        WrappedComponent: React.ElementType,
    ) => React.ElementType<PublicProps>;
}

export interface IStoreForComp<State, StateChangeNotificationKey>
    // eslint-disable-next-line max-len
    extends Omit<IObservableStateStore<State, StateChangeNotificationKey>, 'getState' | 'registerObserver' | 'unRegisterObserver'> {
    state: State;
}

export interface IObserveProps<State, StateChangeNotificationKey, PrivateProps, PublicProps>
    extends IObservePropsBase<StateChangeNotificationKey> {
    select?: (props: IObserveSelectProps<State, PublicProps, StateChangeNotificationKey>) => Partial<PrivateProps>;
    set?: (props: IObserveSetProps<State, StateChangeNotificationKey, PublicProps>) => Partial<PrivateProps>;
}

export interface IObserveSelectProps<State, PublicProps, StateChangeNotificationKey> {
    state: State;
    store: IStoreForComp<State, StateChangeNotificationKey>;
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
    observe: <PublicProps = object>(
        notifications: StateChangeNotificationKey[],
        WrappedComponent: React.ElementType,
    ) => React.ElementType<PublicProps>;
    observeXL: <PrivateProps = IActionableStoreForComp<State, StateChangeNotificationKey>, PublicProps = object>(
        props: IActionableObserveProps<State, StateChangeNotificationKey, PrivateProps, PublicProps>,
        WrappedComponent: React.ElementType,
    ) => React.ElementType<PublicProps>;
}

export interface IActionableStoreForComp<State, StateChangeNotificationKey>
    // eslint-disable-next-line max-len
    extends Omit<IActionableObservableStateStore<State, StateChangeNotificationKey>, 'getState' | 'registerObserver' | 'unRegisterObserver'> {
    state: State;
}

export interface IActionableObserveProps<State, StateChangeNotificationKey, PrivateProps, PublicProps>
    extends IObservePropsBase<StateChangeNotificationKey> {
    // eslint-disable-next-line max-len
    select?: (props: IActionableObserveSelectProps<State, PublicProps, StateChangeNotificationKey>) => Partial<PrivateProps>;
    // eslint-disable-next-line max-len
    set?: (props: IActionableObserveSetProps<State, StateChangeNotificationKey, PublicProps>) => Partial<PrivateProps>;
}

export interface IActionableObserveSelectProps<State, PublicProps, StateChangeNotificationKey> {
    state: State;
    store: IActionableStoreForComp<State, StateChangeNotificationKey>;
    publicProps?: PublicProps;
}

export interface IActionableObserveSetProps<State, StateChangeNotificationKey, PublicProps>
    extends Pick<IActionableObservableStateStore<State, StateChangeNotificationKey>, 'getState' | 'dispatch'> {
    publicProps?: PublicProps;
}
