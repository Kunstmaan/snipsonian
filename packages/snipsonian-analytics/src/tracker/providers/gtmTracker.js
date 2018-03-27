/* global dataLayer */

import initOptionalFields from './initOptionalFields';

let virtualUrlPrefix = '';

export default {
    setVirtualUrlPrefix,
    sendVirtualPageview,
    sendEvent,
    sendTiming
};

function setVirtualUrlPrefix(newPrefix) {
    virtualUrlPrefix = newPrefix;
}

function sendVirtualPageview({virtualUrl, custom = {}}) {
    dataLayer.push({
        event: 'virtualPageView',
        virtualUrl: prefixVirtualUrl(virtualUrl),
        ...custom
    });
}

function prefixVirtualUrl(virtualUrl) {
    return `${virtualUrlPrefix}${virtualUrl}`;
}

function sendEvent({
    category,
    action,
    label,
    value,
    isNonInteraction = false,
    custom = {}
}) {
    dataLayer.push({
        event: 'event',
        nonInteraction: isNonInteraction,
        ...initOptionalFields({
            eventCategory: category,
            eventAction: action,
            eventLabel: label,
            eventValue: value
        }),
        ...custom
    });
}

function sendTiming({
    category,
    timingVar,
    value,
    label,
    custom = {}
}) {
    dataLayer.push({
        event: 'timing',
        ...initOptionalFields({
            timingCategory: category,
            timingVar,
            timingValue: value,
            timingLabel: label
        }),
        ...custom
    });
}
