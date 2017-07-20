/* global ga */

/**
 * The optional custom object param can be used for custom dimensions and metrics
 * See https://developers.google.com/analytics/devguides/collection/analyticsjs/custom-dims-mets
 */

let onSendVirtualPageview = ({virtualUrl, custom}) => {
    ga('set', 'page', virtualUrl);
    ga('send', 'pageview', custom);
};

let onSendEvent = ({category, action, label, value, nonInteraction, custom}) => {
    ga('send', Object.assign({
        hitType: 'event',
        eventCategory: category,
        eventAction: action,
        eventLabel: label,
        eventValue: value,
        nonInteraction
    }, custom));
};

let onSendSocial = ({network, action, target, custom}) => {
    ga('send', Object.assign({
        hitType: 'social',
        socialNetwork: network,
        socialAction: action,
        socialTarget: target
    }, custom));
};

let onSendTiming = ({category, timingVar, value, label, custom}) => {
    ga('send', Object.assign({
        hitType: 'timing',
        timingCategory: category,
        timingVar,
        timingValue: value,
        timingLabel: label
    }, custom));
};

let onSendException = ({description, isFatal, custom}) => {
    ga('send', Object.assign({
        hitType: 'exception',
        exDescription: description,
        exFatal: isFatal
    }, custom));
};

export function overrideTracker({
    newOnSendVirtualPageview,
    newOnSendEvent,
    newOnSendSocial,
    newOnSendTiming,
    newOnSendException
} = {}) {
    if (newOnSendVirtualPageview) {
        onSendVirtualPageview = newOnSendVirtualPageview;
    }

    if (newOnSendEvent) {
        onSendEvent = newOnSendEvent;
    }

    if (newOnSendSocial) {
        onSendSocial = newOnSendSocial;
    }

    if (newOnSendTiming) {
        onSendTiming = newOnSendTiming;
    }

    if (onSendException) {
        onSendException = newOnSendException;
    }
}

export function sendVirtualPageview({virtualUrl, custom = {}}) {
    onSendVirtualPageview({virtualUrl, custom});
}

export function sendEvent({category, action, label, value, nonInteraction = false, custom = {}}) {
    onSendEvent({category, action, label, value, nonInteraction, custom});
}

export function sendSocial({network, action, target, custom = {}}) {
    onSendSocial({network, action, target, custom});
}

export function sendTiming({category, timingVar, value, label, custom = {}}) {
    onSendTiming({category, timingVar, value, label, custom});
}

export function sendException({description, isFatal = false, custom = {}}) {
    onSendException({description, isFatal, custom});
}

export default {
    sendVirtualPageview,
    sendEvent,
    sendSocial,
    sendTiming,
    sendException
};