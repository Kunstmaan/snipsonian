import React from 'react';
import { IStateObserver } from '@snipsonian/observable-state/src/observer/createStateObserverManager';
import { IActionableObservableStateStore } from '@snipsonian/observable-state/src/actionableStore/types';
import {
    IActionableReactObservableState,
    IActionableObserveProps,
    IActionableStoreForComp,
} from './types';
import createObservableStateContext from '../context/createObservableStateContext';

// eslint-disable-next-line max-len
export default function initActionableReactObservableState<State, StateChangeNotificationKey = string>(): IActionableReactObservableState<State, StateChangeNotificationKey> {
    // eslint-disable-next-line max-len
    const ObservableStateContext = createObservableStateContext<State, StateChangeNotificationKey, IActionableObservableStateStore<State, StateChangeNotificationKey>>();

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function observe<PublicProps = {}>(
        notifications: StateChangeNotificationKey[],
        WrappedComponent: React.ElementType,
    ) {
        return observeXL<IActionableStoreForComp<State, StateChangeNotificationKey>, PublicProps>(
            {
                notifications,
                select: ({ store }) => store,
            },
            WrappedComponent,
        );
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function observeXL<PrivateProps, PublicProps = {}>(
        {
            notifications,
            select,
            set,
        }: IActionableObserveProps<State, StateChangeNotificationKey, PrivateProps, PublicProps>,
        WrappedComponent: React.ElementType,
    ) {
        return (inputPublicProps: PublicProps) => (
            <ObservableStateContext.Consumer>
                {(store) => {
                    /* eslint-disable react/no-this-in-sfc */
                    class ObserverWrapper extends React.Component {
                        private observer: IStateObserver<StateChangeNotificationKey>;
                        private _isMounted = false;

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

                                    // eslint-disable-next-line no-underscore-dangle
                                    if (this._isMounted) {
                                        this.forceUpdate();
                                    }
                                },
                            });
                        }

                        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                        public componentDidMount() {
                            // eslint-disable-next-line no-underscore-dangle
                            this._isMounted = true;
                        }

                        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                        public componentWillUnmount() {
                            if (this.observer) {
                                store.unRegisterObserver(this.observer);
                            }
                        }

                        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                        public render() {
                            const publicProps = this.props as PublicProps;

                            const privatePropsFromSelect = select
                                ? select({
                                    state: store.getState(),
                                    store: getActionableStoreForComponent(),
                                    publicProps,
                                })
                                : getActionableStoreForComponent();

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
                    }
                    /* eslint-enable react/no-this-in-sfc */

                    // eslint-disable-next-line max-len
                    function getActionableStoreForComponent(): IActionableStoreForComp<State, StateChangeNotificationKey> {
                        const {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            getState, registerObserver, unRegisterObserver,
                            ...otherProps
                        } = store;

                        return {
                            state: store.getState(),
                            ...otherProps,
                        };
                    }

                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return <ObserverWrapper {...inputPublicProps} />;
                }}
            </ObservableStateContext.Consumer>
        );
    }

    return {
        ObservableStateProvider: ObservableStateContext.Provider,
        observe,
        observeXL,
    };
}
