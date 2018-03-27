/* eslint-disable consistent-return */
export default function conditionalCatch({shouldCatchErrors = false, actionToExecute, onError}) {
    if (shouldCatchErrors) {
        try {
            return actionToExecute();
        } catch (error) {
            if (typeof onError === 'function') {
                return onError(error);
            }
        }
    } else {
        return actionToExecute();
    }
}
/* eslint-enable consistent-return */
