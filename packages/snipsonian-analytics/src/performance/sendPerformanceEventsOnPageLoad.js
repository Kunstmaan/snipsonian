/* global window */

import getServiceWorkerStatus from '../../../snipsonian-browser/src/serviceWorker/getServiceWorkerStatus';
import { sendTiming } from '../tracker';
import getTimeToFirstPaint from './getTimeToFirstPaint';
import getNavigationStartTimeInMillis from './getNavigationStartTimeInMillis';

export default function sendPerformanceEventsOnPageLoad({
    timingEventCategory = 'performance',
    timeToFirstPaintVarName = 'timeToFirstPaint',
    timeToLoadVarName = 'timeToLoad',
} = {}) {
    window.addEventListener('load', () => {
        const nowInMillis = getCurrentTimeInMillis();

        sendTiming({
            category: timingEventCategory,
            timingVar: timeToFirstPaintVarName,
            value: toTimingValue(getTimeToFirstPaint()),
            label: `SW Status: ${getServiceWorkerStatus()}`,
        });

        sendTiming({
            category: timingEventCategory,
            timingVar: timeToLoadVarName,
            value: toTimingValue(nowInMillis - getNavigationStartTimeInMillis()),
        });
    });
}

function getCurrentTimeInMillis() {
    return new Date().getTime();
}

function toTimingValue(input) {
    return Math.round(input);
}
