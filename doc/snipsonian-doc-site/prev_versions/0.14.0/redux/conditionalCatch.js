const NOOP = () => {};

export default function conditionalCatch({shouldCatchErrors = false, actionToExecute, onError = NOOP}) {
    if (shouldCatchErrors) {
        try {
            return actionToExecute();
        } catch (error) {
            return onError(error);
        }
    } else {
        return actionToExecute();
    }
}
