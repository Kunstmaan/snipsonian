import simulateWaitTime from './simulateWaitTime';
import { ONE_SECOND_IN_MILLIS } from '../time/periodsInMillis';

export default function waitSeconds(nrOfSecondsToWait: number): Promise<void> {
    return simulateWaitTime({
        waitTimeInMillis: nrOfSecondsToWait * ONE_SECOND_IN_MILLIS,
    });
}
