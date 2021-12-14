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

function getFirstPaintTimeInMillis(): number {
    // Chrome

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.chrome && window.chrome.loadTimes) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return window.chrome.loadTimes().firstPaintTime * 1000;
    }

    const navTiming = getPerformanceTiming();

    // IE/Edge
    // See http://msdn.microsoft.com/ff974719

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (navTiming.msFirstPaint) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return navTiming.msFirstPaint;
    }

    return undefined;
}
