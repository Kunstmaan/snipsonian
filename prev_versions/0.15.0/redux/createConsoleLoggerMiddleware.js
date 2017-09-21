/* eslint-disable no-console */

export default function createConsoleLoggerMiddleware({collapsed = true}) {
    const isGroupingSupported = console.group;

    return (store) => (next) => (action) => {
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
            console.groupEnd(groupLabel);
        }

        return result;
    };
}
