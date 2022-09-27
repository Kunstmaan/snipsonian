import { ONE_MINUTE_IN_MILLIS } from '../time/periodsInMillis';
import { getCurrentTimestamp } from '../date/currentDate';

export interface IExtendedPromise<ResolveData> extends Promise<ResolveData> {
    isPending: () => boolean;
    isRejected: () => boolean;
    isResolved: () => boolean;
    wasResolvedPriorTo: (props: IWasResolvedPriorToProps) => boolean;
    /* Returns the number of milliseconds since the promise was resolved.
       Null if not resolved yet. */
    getMillisSinceResolved: () => number;
}

interface IWasResolvedPriorToProps {
    minutesAgo: number;
}

/**
 * As you can't see the status of a promise, here is a function to extend a given promise with some status functions.
 */
export default function extendPromise<ResolveData>(promise: Promise<ResolveData>): IExtendedPromise<ResolveData> {
    let promiseStatus = 'pending'; /* initial state */
    let resolveTimestamp: number = null;

    const extendedPromise = promise
        .then((resolveData) => {
            promiseStatus = 'resolved';
            resolveTimestamp = getCurrentTimestamp();

            return resolveData;
        })
        .catch((error) => {
            promiseStatus = 'rejected';

            throw error;
        }) as IExtendedPromise<ResolveData>;

    extendedPromise.isPending = () => promiseStatus === 'pending';
    extendedPromise.isRejected = () => promiseStatus === 'rejected';
    extendedPromise.isResolved = () => promiseStatus === 'resolved';

    extendedPromise.wasResolvedPriorTo = ({ minutesAgo }: IWasResolvedPriorToProps): boolean => {
        if (resolveTimestamp === null) {
            return false;
        }

        if (resolveTimestamp < (getCurrentTimestamp() - (minutesAgo * ONE_MINUTE_IN_MILLIS))) {
            return true;
        }

        return false;
    };
    extendedPromise.getMillisSinceResolved = (): number => {
        if (resolveTimestamp === null) {
            return null;
        }

        return (getCurrentTimestamp() - resolveTimestamp);
    };

    return extendedPromise;
}
