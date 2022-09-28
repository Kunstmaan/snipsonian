// eslint-disable-next-line import/no-extraneous-dependencies
import produce from 'immer';
import isArrayWithValues from '@snipsonian/core/src/array/verification/isArrayWithValues';
import cloneObjectDataProps from '@snipsonian/core/es/object/cloneObjectDataProps';
import { getNrOfRunningApiCalls } from '@snipsonian/axios/src/request/getRequestWrapper';
import {
    getRestServerMock,
    IRestHandlerMock,
    IRestServerMock,
    setupRestServerMock,
} from '@snipsonian/axios/src/testing/mockRestServer';
import { Action, IActionableObservableStateStore } from '../types';
import { IStateIntegrationTester, TActionOrToBeExecuted } from './types';

export default function getActionableStoreIntegrationTester<State, StateChangeNotificationKey>({
    store,
    defaultRestHandlerMocks = [],
    initialState,
    defaultBaseApiUrl,
}: {
    store: IActionableObservableStateStore<State, StateChangeNotificationKey>;
    defaultRestHandlerMocks?: IRestHandlerMock[];
    initialState: State;
    defaultBaseApiUrl?: string;
}): IStateIntegrationTester<State> {
    const initialStateWhenResetting = cloneObjectDataProps(initialState);
    let restServerMock: IRestServerMock = null;

    const tester: IStateIntegrationTester<State> = {
        given({ restHandlerMocks = [], keepState = false }, callback) {
            restServerMock = getRestServerMock()
                || setupRestServerMock(defaultRestHandlerMocks, { defaultBaseApiUrl });

            if (isArrayWithValues(restHandlerMocks)) {
                restServerMock.addRuntimeHandlers(...restHandlerMocks);
            }

            if (!keepState) {
                store.setState({
                    newState: initialStateWhenResetting,
                });
            }

            if (callback) {
                callback({
                    setupActions,
                    setupState,
                    getState,
                });
            }
        },

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async when<ResultData = any>(
            actionOrToBeExecuted: TActionOrToBeExecuted<ResultData>,
        ) {
            try {
                let promise = null;

                if (typeof actionOrToBeExecuted === 'function') {
                    /* to be executed */
                    promise = actionOrToBeExecuted();
                } else {
                    /* action */
                    store.dispatch(actionOrToBeExecuted);

                    promise = Promise.resolve<ResultData>(null);
                }

                await resolveAllPromisesUntilNoMoreRunningApiCalls();

                // eslint-disable-next-line @typescript-eslint/return-await
                return promise;
            } finally {
                restServerMock.removeRuntimeHandlers();
            }
        },

        then(callback) {
            if (callback) {
                callback({
                    getState,
                });
            }
        },
    };

    return tester;

    function setupActions(...actionsToSetup: Action[]) {
        actionsToSetup.forEach((actionToSetup) => store.dispatch(actionToSetup));
    }

    function setupState(stateUpdater: (draftState: State) => void) {
        store.setState({
            newState: produce(getState(), stateUpdater),
        });
    }

    function getState(): State {
        return store.getState();
    }
}

/**
 * This line resolves every promise in a single event loop-tick.
 * window.setImmediate is used to break up long-running operations and run a callback function immediately
 * after the browser has completed other operations such as events and display updates. In this case, our
 * hanging HTTP request is this operation we want to finish. Also, since it’s not a standard feature, you
 * shouldn’t use it in production code.
 */
export function resolveAllPromises(): Promise<void> {
    return new Promise((resolve) => setImmediate(resolve));
}

function resolveAllPromisesUntilNoMoreRunningApiCalls(): Promise<void> {
    return resolveAllPromises()
        .then(() => {
            if (getNrOfRunningApiCalls() > 0) {
                return resolveAllPromisesUntilNoMoreRunningApiCalls();
            }

            return null;
        });
}
