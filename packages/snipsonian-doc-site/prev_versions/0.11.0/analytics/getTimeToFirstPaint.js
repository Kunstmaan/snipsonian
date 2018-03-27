/* global window */

import getNavigationStartTimeInMillis, {
    isPerformanceTimingSupported,
    getPerformanceTiming
} from './getNavigationStartTimeInMillis';

export default function getTimeToFirstPaint() {
    if (isPerformanceTimingSupported()) {
        const navStartTime = getNavigationStartTimeInMillis();
        const fistPaintTime = getFirstPaintTimeInMillis();

        if (fistPaintTime && navStartTime) {
            return fistPaintTime - navStartTime;
        }
    }

    return undefined;
}

function getFirstPaintTimeInMillis() {
    // Chrome
    if (window.chrome && window.chrome.loadTimes) {
        return window.chrome.loadTimes().firstPaintTime * 1000;
    }

    const navTiming = getPerformanceTiming();

    // IE/Edge
    // See http://msdn.microsoft.com/ff974719
    if (navTiming.msFirstPaint) {
        return navTiming.msFirstPaint;
    }

    return undefined;
}