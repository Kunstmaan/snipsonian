const NOOP = () => {};

export default function conditionalCatch({shouldCatchErrors = false, actionToExecute, onError}) {
    if (shouldCatchErrors) {
        try {
            return actionToExecute();
        } catch (error) {
            return onError ? onError(error) : NOOP;
        }
    } else {
        return actionToExecute();
    }
}
