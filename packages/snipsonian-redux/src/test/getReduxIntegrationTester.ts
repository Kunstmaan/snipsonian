import { Store } from 'redux';
import isSet from '@snipsonian/core/src/is/isSet';
import {
    IReduxIntegrationTester, ITestOptions, IWhenResult, TGivenCallback, TThenCallback,
    TWhenCallback,
    IGivenOptions,
} from './types';
import { IAction } from '../action/types';

export default function getReduxIntegrationTester<State, ExtraGivenProps extends object = {}>({
    store,
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    extraGivenProps = ({} as ExtraGivenProps),
    onGivenStart,
    actionToDispatchOnGivenStart, // e.g. action to reset to the initial state
}: {
    store: Store;
    extraGivenProps?: ExtraGivenProps;
    onGivenStart?: () => void;
    actionToDispatchOnGivenStart?: IAction<{}>;
}): IReduxIntegrationTester<State, ExtraGivenProps> {
    const reduxIntegrationTester: IReduxIntegrationTester<State, ExtraGivenProps> = {
        given(callback: TGivenCallback<State, ExtraGivenProps>, options: IGivenOptions = { keepState: false }) {
            if (!options.keepState && onGivenStart) {
                onGivenStart();
            }
            if (!options.keepState && actionToDispatchOnGivenStart && isSet(actionToDispatchOnGivenStart.type)) {
                store.dispatch(actionToDispatchOnGivenStart);
            }

            callback({
                initialiseState,
                getState,
                ...extraGivenProps,
            });
        },

        async when(callback: TWhenCallback): Promise<IWhenResult<State>> {
            let promise;

            callback({
                triggerAction: (action: IAction<{}>, options?: ITestOptions) => {
                    promise = dispatchActionTrigger(action, options);
                },
            });

            if (promise) {
                await promise;
            }

            return {
                state: getState(),
                resolveAllPromises,
            };
        },

        then(callback: TThenCallback<State>) {
            callback({
                getState,
            });
        },
    };

    return reduxIntegrationTester;

    function getState(): State {
        return store.getState();
    }

    function initialiseState(...setupActions: IAction<{}>[]): void {
        setupActions.forEach((setupAction) => store.dispatch(setupAction));
    }

    function dispatchActionTrigger(
        action: IAction<{}>,
        { immediatelyResolve = true }: ITestOptions = {},
    ): Promise<void> {
        store.dispatch(action);

        if (immediatelyResolve) {
            return resolveAllPromises();
        }

        return Promise.resolve();
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
