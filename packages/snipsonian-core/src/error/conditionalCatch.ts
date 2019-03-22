export interface IConditionalCatchInput {
    actionToExecute: () => any;
    onError?: (error: any) => any;
    shouldCatchErrors?: boolean;
}

export default function conditionalCatch({
    actionToExecute,
    onError,
    shouldCatchErrors = false,
}: IConditionalCatchInput) {
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
