/* global ga */

/**
 * The optional custom object param can be used for custom dimensions and metrics
 * See https://developers.google.com/analytics/devguides/collection/analyticsjs/custom-dims-mets
 */

export default {
    sendVirtualPageview,
    sendEvent,
    sendSocial,
    sendTiming,
    sendException
};

function sendVirtualPageview({virtualUrl, custom = {}}) {
    ga('set', 'page', virtualUrl);
    ga('send', 'pageview', custom);
}

function sendEvent({
    category,
    action,
    label,
    value,
    isNonInteraction = false,
    custom = {}
}) {
    ga('send', {
        hitType: 'event',
        eventCategory: category,
        eventAction: action,
        eventLabel: label,
        eventValue: value,
        nonInteraction: isNonInteraction,
        ...custom
    });
}

function sendSocial({
    network,
    action,
    target,
    custom = {}
}) {
    ga('send', {
        hitType: 'social',
        socialNetwork: network,
        socialAction: action,
        socialTarget: target,
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
    ga('send', {
        hitType: 'timing',
        timingCategory: category,
        timingVar,
        timingValue: value,
        timingLabel: label,
        ...custom
    });
}

function sendException({
    description,
    isFatal = false,
    custom = {}
}) {
    ga('send', {
        hitType: 'exception',
        exDescription: description,
        exFatal: isFatal,
        ...custom
    });
}
