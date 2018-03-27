/* global window */

export default function getNavigationStartTimeInMillis() {
    if (isPerformanceTimingSupported()) {
        return getPerformanceTiming().navigationStart;
    }

    return undefined;
}

export function isPerformanceTimingSupported() {
    return window.performance && window.performance.timing;
}

export function getPerformanceTiming() {
    return window.performance.timing;
}
