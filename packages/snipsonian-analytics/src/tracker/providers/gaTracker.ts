import {
    IVirtualPageview,
    IEvent,
    ISocialInteraction,
    ITiming,
    IException,
    ITracker,
} from '../index';

type TGaParam = string | number | object;
declare const ga: (action: string, ...params: TGaParam[]) => void;

/**
 * The optional custom object param can be used for custom dimensions and metrics
 * See https://developers.google.com/analytics/devguides/collection/analyticsjs/custom-dims-mets
 */

const gaTracker: ITracker = {
    sendVirtualPageview,
    sendEvent,
    sendSocial,
    sendTiming,
    sendException,
};

export default gaTracker;

function sendVirtualPageview({ virtualUrl, custom = {} }: IVirtualPageview): void {
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
}: IEvent): void {
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
}: ISocialInteraction): void {
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
}: ITiming): void {
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
}: IException): void {
    ga('send', {
        hitType: 'exception',
        exDescription: description,
        exFatal: isFatal,
        ...custom,
    });
}
