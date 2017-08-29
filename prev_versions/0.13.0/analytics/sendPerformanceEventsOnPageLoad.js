/* global window */

import {sendTiming} from './tracker';
import getTimeToFirstPaint from './getTimeToFirstPaint';
import getNavigationStartTimeInMillis from './getNavigationStartTimeInMillis';
import getServiceWorkerStatus from '../serviceWorker/getServiceWorkerStatus';

export default function sendPerformanceEventsOnPageLoad({
    timingEventCategory = 'Performance',
    timeToFirstPaintVarName = 'timeToFirstPaint',
    loadVarName = 'load'
} = {}) {
    window.addEventListener('load', () => {
        const nowInMillis = getCurrentTimeInMillis();

        sendTiming({
            category: timingEventCategory,
            timingVar: timeToFirstPaintVarName,
            value: toTimingValue(getTimeToFirstPaint()),
            label: `SW Status: ${getServiceWorkerStatus()}`
        });

        sendTiming({
            category: timingEventCategory,
            timingVar: loadVarName,
            value: toTimingValue(nowInMillis - getNavigationStartTimeInMillis())
        });
    });
}

function getCurrentTimeInMillis() {
    return new Date().getTime();
}

function toTimingValue(input) {
    return Math.round(input);
}