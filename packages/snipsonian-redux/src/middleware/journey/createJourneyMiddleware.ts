import { Action, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { TFilterHookResult, TRegisteredJourney } from './types';
import {
    getRegisteredJourneys,
} from './journeyManager';
import getActionType2JourneyHooksMaps from './actionTypeMaps/getActionType2JourneyHooksMaps';
import getJourneyHooksThatMatchAction from './actionTypeMaps/getJourneyHooksThatMatchAction';
import { IAction } from '../../action/types';

// TODO flag to do additional debug logging? (e.g. log rejected actions)

const WARN_MESSAGE = {
    // eslint-disable-next-line max-len
    FILTER_MAY_NOT_RETURN_OTHER_ACTION_TYPE: 'Journey: returning another action type from a filter hook is not supported!!!',
};

export default function createJourneyMiddleware({
    journeys = getRegisteredJourneys(),
    extraProcessInput = {},
}: {
    journeys?: TRegisteredJourney[];
    extraProcessInput?: object;
} = {}): Middleware {
    const actionType2JourneyHooksMaps = getActionType2JourneyHooksMaps(journeys);

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const middleware = ({ getState, dispatch }: MiddlewareAPI<Dispatch<Action>, {}>) =>
        (next: Dispatch<Action>) =>
            (action: IAction<{}>) => {
                const hooksThatMatchAction = getJourneyHooksThatMatchAction(action, actionType2JourneyHooksMaps);

                const filterHooksResultingAction = executeFilterHooks();

                if (filterHooksResultingAction === false) {
                    /* the incoming action is stopped/rejected */
                    // @ts-ignore
                    return;
                }

                /* to the next middleware in the pipeline (or the reducer(s) if at the pipeline end) */
                const resultNextMiddleware = next(filterHooksResultingAction);

                executeProcessHooks(filterHooksResultingAction);

                // eslint-disable-next-line consistent-return
                return resultNextMiddleware;

                function executeFilterHooks(): TFilterHookResult {
                    let resultingAction: TFilterHookResult = action;

                    if (hooksThatMatchAction && hooksThatMatchAction.filterHooks) {
                        // eslint-disable-next-line no-restricted-syntax
                        for (const filterHook of hooksThatMatchAction.filterHooks) {
                            if (resultingAction === false) {
                                break;
                            }

                            const filterResultingAction = filterHook({
                                getState,
                                action: resultingAction,
                                dispatch,
                            });

                            /**
                             * Propagating another action type to the next filterHook/Middleware is not supported
                             * because, otherwise, we would have to re-evaluate again which filter- and processHooks
                             * match the new action, making it a lot more complex (for a presumably very small
                             * use case).
                             */
                            if (filterResultingAction && filterResultingAction.type !== action.type) {
                                if (process.env.NODE_ENV !== 'test') {
                                    console.warn(WARN_MESSAGE.FILTER_MAY_NOT_RETURN_OTHER_ACTION_TYPE);
                                }
                            } else {
                                resultingAction = filterResultingAction;
                            }
                        }
                    }

                    return resultingAction;
                }

                function executeProcessHooks(filteredAction: IAction<{}>): void {
                    // these hooks can return a promise, but here we're not interested in the result

                    if (hooksThatMatchAction && hooksThatMatchAction.processHooks) {
                        hooksThatMatchAction.processHooks.forEach((processHook) => {
                            processHook({
                                getState,
                                action: filteredAction,
                                dispatch,
                                ...extraProcessInput,
                            });
                        });
                    }
                }
            };

    return middleware;
}
