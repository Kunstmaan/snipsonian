import getNavigationStartTimeInMillis, {
    isPerformanceTimingSupported,
    getPerformanceTiming,
} from './getNavigationStartTimeInMillis';

export default function getTimeToFirstPaintInMillis(): number {
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

    // @ts-ignore
    if (window.chrome && window.chrome.loadTimes) {
        // @ts-ignore
        return window.chrome.loadTimes().firstPaintTime * 1000;
    }

    const navTiming = getPerformanceTiming();

    // IE/Edge
    // See http://msdn.microsoft.com/ff974719

    // @ts-ignore
    if (navTiming.msFirstPaint) {
        // @ts-ignore
        return navTiming.msFirstPaint;
    }

    return undefined;
}
