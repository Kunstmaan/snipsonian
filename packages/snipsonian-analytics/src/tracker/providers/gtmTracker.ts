declare let dataLayer: any[];

import {
    IVirtualPageview,
    IEvent,
    ISocialInteraction,
    ITiming,
    IException,
    ITracker,
} from '../index';
import initOptionalFields from './initOptionalFields';

let virtualUrlPrefix: string = '';

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

function setVirtualUrlPrefix(newPrefix: string) {
    virtualUrlPrefix = newPrefix;
}

function sendVirtualPageview({ virtualUrl, custom = {} }: IVirtualPageview) {
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
}: IEvent) {
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
}: ISocialInteraction) {
    console.log('GTM sendSocial not implemented yet!');
}

function sendTiming({
    category,
    timingVar,
    value,
    label,
    custom = {},
}: ITiming) {
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
}: IException) {
    console.log('GTM sendException not implemented yet!');
}

function prefixVirtualUrl(virtualUrl: string) {
    return `${virtualUrlPrefix}${virtualUrl}`;
}
