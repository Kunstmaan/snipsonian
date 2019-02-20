declare const ga: (action: string, ...params: any[]) => void;

import {
    IVirtualPageview,
    IEvent,
    ISocialInteraction,
    ITiming,
    IException,
} from '../index';

/**
 * The optional custom object param can be used for custom dimensions and metrics
 * See https://developers.google.com/analytics/devguides/collection/analyticsjs/custom-dims-mets
 */

export default {
    sendVirtualPageview,
    sendEvent,
    sendSocial,
    sendTiming,
    sendException,
};

function sendVirtualPageview({ virtualUrl, custom = {} }: IVirtualPageview) {
    ga('set', 'page', virtualUrl);
    ga('send', 'pageview', custom);
}

function sendEvent({
    category,
    action,
    label,
    value,
    isNonInteraction = false,
    custom = {},
}: IEvent) {
    ga('send', {
        hitType: 'event',
        eventCategory: category,
        eventAction: action,
        eventLabel: label,
        eventValue: value,
        nonInteraction: isNonInteraction,
        ...custom,
    });
}

function sendSocial({
    network,
    action,
    target,
    custom = {},
}: ISocialInteraction) {
    ga('send', {
        hitType: 'social',
        socialNetwork: network,
        socialAction: action,
        socialTarget: target,
        ...custom,
    });
}

function sendTiming({
    category,
    timingVar,
    value,
    label,
    custom = {},
}: ITiming) {
    ga('send', {
        hitType: 'timing',
        timingCategory: category,
        timingVar,
        timingValue: value,
        timingLabel: label,
        ...custom,
    });
}

function sendException({
    description,
    isFatal = false,
    custom = {},
}: IException) {
    ga('send', {
        hitType: 'exception',
        exDescription: description,
        exFatal: isFatal,
        ...custom,
    });
}
