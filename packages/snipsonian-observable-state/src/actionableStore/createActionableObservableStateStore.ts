import {
    Action,
    Dispatch,
    Middleware,
    IActionableObservableStateStore,
    IActionableObservableStateStoreConfig, MiddlewareAPI,
} from './types';
import createObservableStateStore from '../store/createObservableStateStore';
import createObservableStateActionMiddleware from './createObservableStateActionMiddleware';
import { IObservableStateStore } from '../store/types';

// eslint-disable-next-line max-len
export default function createActionableObservableStateStore<State, ExtraProcessInput, StateChangeNotificationKey = string>(
    config: IActionableObservableStateStoreConfig<State, ExtraProcessInput>,
): IActionableObservableStateStore<State, StateChangeNotificationKey> {
    // eslint-disable-next-line max-len
    const store = createObservableStateStore<State, StateChangeNotificationKey>(config) as IActionableObservableStateStore<State, StateChangeNotificationKey>;

    const middlewares: Middleware[] = [
        ...(config.middlewares || []),
        /* always has to be the last one !!! */
        createObservableStateActionMiddleware<State, ExtraProcessInput, StateChangeNotificationKey>({
            store,
            extraProcessInput: config.observableStateActionExtraProcessInput,
        }),
    ];

    store.dispatch = applyMiddleware({ store, middlewares });

    return store;
}

function applyMiddleware<State, StateChangeNotificationKey>({
    store,
    middlewares,
}: {
    store: IObservableStateStore<State, StateChangeNotificationKey>;
    middlewares: Middleware[];
}): Dispatch<Action> {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    let dispatch = () => {
        throw new Error(
            'Dispatching while constructing your middleware is not allowed. ' +
            'Other middleware would not be applied to this dispatch.',
        );
    };

    const middlewareAPI: MiddlewareAPI = {
        getState: store.getState,
        // @ts-ignore
        dispatch: (...args) => dispatch(...args),
    };

    // @ts-ignore
    const innerDispatch: Dispatch<Action> = (action: Action): Action => action;

    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    dispatch = compose(...chain)(innerDispatch);

    return dispatch;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose(...funcs: Function[]): Function {
    if (funcs.length === 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (arg: any) => arg;
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (a, b) => (...args: any) => a(b(...args)),
    );
}
