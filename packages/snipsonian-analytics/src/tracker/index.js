let tracker = null;

function isTrackerInitialized() {
    return tracker !== null;
}

function getTracker() {
    if (!isTrackerInitialized()) {
        throw new Error('Tracker was not initialized.');
    }
    return tracker;
}

export function initTracker(newTracker) {
    tracker = newTracker;
}

export function sendVirtualPageview({
    virtualUrl,
    custom = {},
}) {
    getTracker().sendVirtualPageview({
        virtualUrl,
        custom,
    });
}

export function sendEvent({
    category,
    action,
    label,
    value,
    isNonInteraction = false,
    custom = {},
}) {
    getTracker().sendEvent({
        category,
        action,
        label,
        value,
        isNonInteraction,
        custom,
    });
}

export function sendSocial({
    network,
    action,
    target,
    custom = {},
}) {
    getTracker().sendSocial({
        network,
        action,
        target,
        custom,
    });
}

export function sendTiming({
    category,
    timingVar,
    value,
    label,
    custom = {},
}) {
    getTracker().sendTiming({
        category,
        timingVar,
        value,
        label,
        custom,
    });
}

export function sendException({
    description,
    isFatal = false,
    custom = {},
}) {
    getTracker().sendException({
        description,
        isFatal,
        custom,
    });
}
