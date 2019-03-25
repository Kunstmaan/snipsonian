import { Action, Dispatch, Middleware, MiddlewareAPI } from 'redux';

export default function createConsoleLoggerMiddleware({
    collapsed = true,
}: {
    collapsed?: boolean;
} = {}) {
    const isGroupingSupported = console.group;

    const middleware = (store: MiddlewareAPI<Dispatch<Action>, {}>) =>
        (next: Dispatch<Action>) =>
            (action: Action) => {
                const groupLabel = action.type;

                if (isGroupingSupported) {
                    if (collapsed) {
                        console.groupCollapsed(groupLabel);
                    } else {
                        console.group(groupLabel);
                    }
                }

                console.log('dispatching', action);

                const result = next(action);

                console.log('next state', store.getState());

                if (isGroupingSupported) {
                    console.groupEnd();
                }

                return result;
            };

    return middleware as Middleware;
}
