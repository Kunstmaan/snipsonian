declare let dataLayer: object[];

import {
    IVirtualPageview,
    IEvent,
    ISocialInteraction,
    ITiming,
    IException,
    ITracker,
} from '../index';
import initOptionalFields from './initOptionalFields';

let virtualUrlPrefix = '';

export interface IGtmTracker extends ITracker {
    setVirtualUrlPrefix: (newPrefix: string) => void;
}

const gtmTracker: IGtmTracker = {
    setVirtualUrlPrefix,
    sendVirtualPageview,
    sendEvent,
    sendSocial,
    sendTiming,
    sendException,
};

export default gtmTracker;

function setVirtualUrlPrefix(newPrefix: string): void {
    virtualUrlPrefix = newPrefix;
}

function sendVirtualPageview({ virtualUrl, custom = {} }: IVirtualPageview): void {
    dataLayer.push({
        event: 'virtualPageView',
        virtualUrl: prefixVirtualUrl(virtualUrl),
        ...custom,
    });
}

function sendEvent({
    category,
    action,
    label,
    value,
    isNonInteraction = false,
    custom = {},
}: IEvent): void {
    dataLayer.push({
        event: 'event',
        eventCategory: category,
        eventAction: action,
        nonInteraction: isNonInteraction,
        ...initOptionalFields({
            eventLabel: label,
            eventValue: value,
        }),
        ...custom,
    });
}

function sendSocial({
    // network,
    // action,
    // target,
    // custom = {},
}: ISocialInteraction): void {
    console.log('GTM sendSocial not implemented yet!');
}

function sendTiming({
    category,
    timingVar,
    value,
    label,
    custom = {},
}: ITiming): void {
    dataLayer.push({
        event: 'timing',
        timingCategory: category,
        timingVar,
        timingValue: value,
        ...initOptionalFields({
            timingLabel: label,
        }),
        ...custom,
    });
}

function sendException({
    // description,
    // isFatal = false,
    // custom = {},
}: IException): void {
    console.log('GTM sendException not implemented yet!');
}

function prefixVirtualUrl(virtualUrl: string): string {
    return `${virtualUrlPrefix}${virtualUrl}`;
}
