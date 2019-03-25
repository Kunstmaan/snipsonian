export interface IVirtualPageview {
    virtualUrl: string;
    custom?: object;
}

export interface IEvent {
    category: string;
    action: string;
    label?: string;
    value?: number;
    isNonInteraction?: boolean;
    custom?: object;
}

export interface ISocialInteraction {
    network: string;
    action: string;
    target: string;
    custom?: object;
}

export interface ITiming {
    category: string;
    timingVar: string;
    value: number;
    label?: string;
    custom?: object;
}

export interface IException {
    description?: string;
    isFatal?: boolean;
    custom?: object;
}

export interface ITracker {
    sendVirtualPageview: (virtualPageview: IVirtualPageview) => void;
    sendEvent: (event: IEvent) => void;
    sendSocial: (socialInteraction: ISocialInteraction) => void;
    sendTiming: (timing: ITiming) => void;
    sendException: (exception: IException) => void;
}

let tracker: ITracker = null;

function isTrackerInitialized(): boolean {
    return tracker !== null;
}

function getTracker(): ITracker {
    if (!isTrackerInitialized()) {
        throw new Error('Tracker was not initialized.');
    }
    return tracker;
}

export function initTracker(newTracker: ITracker): void {
    tracker = newTracker;
}

export function sendVirtualPageview({
    virtualUrl,
    custom = {},
}: IVirtualPageview): void {
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
}: IEvent): void {
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
}: ISocialInteraction): void {
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
}: ITiming): void {
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
}: IException): void {
    getTracker().sendException({
        description,
        isFatal,
        custom,
    });
}
