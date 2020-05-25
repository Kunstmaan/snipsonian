import isFunction from '@snipsonian/core/src/is/isFunction';
import {
    Action,
    AnyAction,
    Dispatch,
    IActionableObservableStateStore,
    IObservableStateAction,
    Middleware,
    MiddlewareAPI,
    TFilterHookResult,
} from './types';
import isObservableStateAction from './isObservableStateAction';
import { IObservableStateStore, ISetStateContext, ISetStateProps } from '../store/types';

/* eslint-disable max-len */

const WARN_MESSAGE = {
    FILTER_MAY_NOT_RETURN_OTHER_ACTION_TYPE: 'Observable state action: returning another action type from a filter hook is not supported!!!',
};

export default function createObservableStateActionMiddleware<
    State,
    ExtraProcessInput,
    StateChangeNotificationKey>({
    store,
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    extraProcessInput = ({} as ExtraProcessInput),
}: {
    store: IObservableStateStore<State, StateChangeNotificationKey>;
    extraProcessInput?: ExtraProcessInput;
}): Middleware {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const middleware: Middleware = ({ getState }: MiddlewareAPI<Dispatch<Action>, State>) =>
        (next: Dispatch<Action>) =>
            (action: Action) => {
                if (isObservableStateAction<string, {}, State, ExtraProcessInput, StateChangeNotificationKey>(action)) {
                    const filterHookResultingAction = executeFilterHook(action);

                    if (filterHookResultingAction === false) {
                        /* the incoming action is stopped/rejected */
                        // @ts-ignore
                        return;
                    }

                    /**
                     * To the next middleware in the pipeline, but at the moment this middleware
                     * is the last one in the chain. (so it will actually call the dummy 'innerDispatch'
                     * which returns the input action)
                     */
                    const resultNextMiddleware = next(filterHookResultingAction);

                    executeProcessHook(filterHookResultingAction);

                    // eslint-disable-next-line consistent-return
                    return resultNextMiddleware;
                }

                // eslint-disable-next-line consistent-return
                return next(action);

                function executeFilterHook(
                    incomingAction: IObservableStateAction<string, {}, State, ExtraProcessInput, StateChangeNotificationKey>,
                ): TFilterHookResult<IObservableStateAction<string, {}, State, ExtraProcessInput, StateChangeNotificationKey>> {
                    if (incomingAction.filter) {
                        const filterResultingAction = incomingAction.filter({
                            action: incomingAction,
                            getState,
                        });

                        /**
                         * Propagating another action type is not supported because, otherwise, we would have
                         * to re-evaluate the action (type) again through the whole middleware chain, making
                         * it a lot more complex (for a presumably very small use case).
                         */
                        if (filterResultingAction && filterResultingAction.type !== incomingAction.type) {
                            if (process.env.NODE_ENV !== 'test') {
                                console.warn(WARN_MESSAGE.FILTER_MAY_NOT_RETURN_OTHER_ACTION_TYPE);
                            }
                        } else {
                            return filterResultingAction;
                        }
                    }

                    return incomingAction;
                }

                function executeProcessHook(filteredAction: IObservableStateAction<string, {}, State, ExtraProcessInput, StateChangeNotificationKey>): void {
                    /* the hook can return a promise, but here we're not really interested in the result of said promise
                       as it will just (probably) call the setState directly on success and/or fail */

                    if (filteredAction.process) {
                        filteredAction.process({
                            action: filteredAction,
                            getState,
                            /* a wrapped setState so that by default the action itself is passed as the context (if not specified) */
                            setState: ({ newState, notificationsToTrigger, context = getDefaultContext(filteredAction) }: ISetStateProps<State, StateChangeNotificationKey>) => {
                                store.setState({
                                    newState,
                                    notificationsToTrigger,
                                    context,
                                });
                            },
                            /* the store.dispatch is created after creating this middleware, but is available
                               at the moment that the actions get processed. */
                            dispatch: (store as IActionableObservableStateStore<State, StateChangeNotificationKey>).dispatch,
                            ...extraProcessInput,
                        });
                    }
                }
            };

    return middleware;
}

/* eslint-enable max-len */

function getDefaultContext(action: AnyAction): ISetStateContext {
    const actionWithoutFunctions = Object.keys(action)
        .reduce(
            (accumulator, propKey) => {
                const propVal = action[propKey];
                if (!isFunction(propVal)) {
                    // eslint-disable-next-line no-param-reassign
                    accumulator[propKey] = propVal;
                }
                return accumulator;
            },
            {} as AnyAction,
        );

    return {
        title: action.type,
        info: actionWithoutFunctions,
    };
}
