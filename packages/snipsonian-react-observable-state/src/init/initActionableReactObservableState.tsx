import React from 'react';
import { IStateObserver } from '@snipsonian/observable-state/src/observer/createStateObserverManager';
import { IActionableObservableStateStore } from '@snipsonian/observable-state/src/actionableStore/types';
import { IActionableReactObservableState, IActionableObserveProps } from './types';
import createObservableStateContext from '../context/createObservableStateContext';

// eslint-disable-next-line max-len
export default function initActionableReactObservableState<State, StateChangeNotificationKey = string>(): IActionableReactObservableState<State, StateChangeNotificationKey> {
    // eslint-disable-next-line max-len
    const ObservableStateContext = createObservableStateContext<State, StateChangeNotificationKey, IActionableObservableStateStore<State, StateChangeNotificationKey>>();

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function observe<PrivateProps, PublicProps = {}>(
        {
            notifications,
            select,
            set,
        }: IActionableObserveProps<State, StateChangeNotificationKey, PrivateProps, PublicProps>,
        WrappedComponent: React.ElementType,
    ) {
        return () => (
            <ObservableStateContext.Consumer>
                {(store) => {
                    /* eslint-disable react/no-this-in-sfc */
                    class ObserverWrapper extends React.Component {
                        private observer: IStateObserver<StateChangeNotificationKey>;

                        public constructor(props: PublicProps) {
                            super(props);

                            this.observer = store.registerObserver({
                                // TODO displayName is er wel als ComponentType i.pl.v. ElementType ?
                                // observerName: WrappedComponent.displayName || 'ObserverWrapper-for-?',
                                observerName: 'ObserverWrapper-for-?',
                                notificationsToObserve: notifications,
                                onNotify: () => {
                                    // will cause render() to be called on the component,
                                    // skipping shouldComponentUpdate()
                                    this.forceUpdate();
                                },
                            });
                        }

                        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                        public render() {
                            const publicProps = this.props as PublicProps;

                            const privatePropsFromSelect = select
                                ? select({
                                    state: store.getState(),
                                    publicProps,
                                })
                                : {};

                            // TODO is adding publicProps here bad for too much re-rendering?
                            const privatePropsFromSet = set
                                ? set({
                                    getState: store.getState,
                                    dispatch: store.dispatch,
                                    publicProps,
                                })
                                : {};

                            return (
                                <WrappedComponent
                                    {...privatePropsFromSelect}
                                    {...privatePropsFromSet}
                                    {...publicProps}
                                />
                            );
                        }

                        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                        public componentWillUnmount() {
                            if (this.observer) {
                                store.unRegisterObserver(this.observer);
                            }
                        }
                    }
                    /* eslint-enable react/no-this-in-sfc */

                    // @ts-ignore
                    return <ObserverWrapper />;
                }}
            </ObservableStateContext.Consumer>
        );
    }

    return {
        ObservableStateProvider: ObservableStateContext.Provider,
        observe,
    };
}
