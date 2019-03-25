export default function getNavigationStartTimeInMillis(): number {
    if (isPerformanceTimingSupported()) {
        return getPerformanceTiming().navigationStart;
    }

    return undefined;
}

export function isPerformanceTimingSupported(): boolean {
    return !!window.performance && !!window.performance.timing;
}

export function getPerformanceTiming(): PerformanceTiming {
    return window.performance.timing;
}
