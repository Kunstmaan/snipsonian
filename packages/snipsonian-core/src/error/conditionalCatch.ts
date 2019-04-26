export interface IConditionalCatchInput {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actionToExecute: () => any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError?: (error: any) => any;
    shouldCatchErrors?: boolean;
}

// eslint-disable-next-line consistent-return
export default function conditionalCatch({
    actionToExecute,
    onError,
    shouldCatchErrors = false,
}: IConditionalCatchInput): any { // eslint-disable-line @typescript-eslint/no-explicit-any
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
