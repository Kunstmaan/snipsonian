export default function conditionalCatch({shouldCatchErrors = false, actionToExecute, onError}) {
    if (shouldCatchErrors) {
        try {
            return actionToExecute();
        } catch (error) {
            if (typeof onError === 'function') {
                return onError(error);
            }
            return;
        }
    } else {
        return actionToExecute();
    }
}
