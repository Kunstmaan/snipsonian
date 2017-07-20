/* global window */

import {
    sendVirtualPageview,
    sendEvent,
    sendSocial,
    sendTiming,
    sendException,
    overrideTracker
} from './tracker';

describe('tracker:', () => {
    beforeEach(() => {
        window.ga = jest.fn();
    });

    describe('sendVirtualPageview()', () => {
        it('default implementation: sets the ga page with the input virtual url + sends a pageview to ga', () => {
            sendVirtualPageview({virtualUrl: '/some/virtual/page'});

            expect(getNrOfGaCalls()).toEqual(2);

            expect(getGaCallParams()[0]).toEqual('set');
            expect(getGaCallParams()[1]).toEqual('page');
            expect(getGaCallParams()[2]).toEqual('/some/virtual/page');

            expect(getGaCallParams(1)[0]).toEqual('send');
            expect(getGaCallParams(1)[1]).toEqual('pageview');
        });

        it('the custom input object can be used to also send custom dimensions and metrics', () => {
            sendVirtualPageview({
                virtualUrl: '/some/virtual/page',
                custom: {
                    dimension15: 'My Custom Dimension',
                    metric8: 24.75
                }
            });

            expect(getGaCallParams(1)[2]).toEqual({
                dimension15: 'My Custom Dimension',
                metric8: 24.75
            });
        });
    });

    describe('sendEvent()', () => {
        it('default implementation: sends a hit of type event to ga (nonInteraction default = false)', () => {
            sendEvent({
                category: 'some cat',
                action: 'some act',
                label: 'some lab',
                value: 'some val'
            });

            expect(getNrOfGaCalls()).toEqual(1);

            expect(getGaCallParams()[0]).toEqual('send');
            expect(getGaCallParams()[1]).toEqual({
                hitType: 'event',
                eventCategory: 'some cat',
                eventAction: 'some act',
                eventLabel: 'some lab',
                eventValue: 'some val',
                nonInteraction: false
            });
        });

        it('the custom input object can be used to also send custom dimensions and metrics', () => {
            sendEvent({
                category: 'some cat',
                action: 'some act',
                label: 'some lab',
                value: 'some val',
                isNonInteraction: true,
                custom: {
                    dimension4: 'My Custom Dimension'
                }
            });

            expect(getGaCallParams()[1]).toEqual({
                hitType: 'event',
                eventCategory: 'some cat',
                eventAction: 'some act',
                eventLabel: 'some lab',
                eventValue: 'some val',
                nonInteraction: true,
                dimension4: 'My Custom Dimension'
            });
        });
    });

    describe('sendSocial()', () => {
        it('default implementation: sends a hit of type social to ga', () => {
            sendSocial({
                network: 'soc netw +',
                action: 'like',
                target: 'http://some.url'
            });

            expect(getNrOfGaCalls()).toEqual(1);

            expect(getGaCallParams()[0]).toEqual('send');
            expect(getGaCallParams()[1]).toEqual({
                hitType: 'social',
                socialNetwork: 'soc netw +',
                socialAction: 'like',
                socialTarget: 'http://some.url'
            });
        });
    });

    describe('sendTiming()', () => {
        it('default implementation: sends a hit of type timing to ga', () => {
            sendTiming({
                category: 'some timing cat',
                timingVar: 'custom time final paint',
                value: 742,
                label: 'some optional label'
            });

            expect(getNrOfGaCalls()).toEqual(1);

            expect(getGaCallParams()[0]).toEqual('send');
            expect(getGaCallParams()[1]).toEqual({
                hitType: 'timing',
                timingCategory: 'some timing cat',
                timingVar: 'custom time final paint',
                timingValue: 742,
                timingLabel: 'some optional label'
            });
        });
    });

    describe('sendException()', () => {
        it('default implementation: sends a hit of type exception to ga (exFatal default = false)', () => {
            sendException({
                description: 'some error desc'
            });

            expect(getNrOfGaCalls()).toEqual(1);

            expect(getGaCallParams()[0]).toEqual('send');
            expect(getGaCallParams()[1]).toEqual({
                hitType: 'exception',
                exDescription: 'some error desc',
                exFatal: false
            });
        });
    });

    describe('overrideTracker()', () => {
        it('can be used to override one or more of the tracker send functions', () => {
            window.someOtherTracker = jest.fn();

            overrideTracker({
                newOnSendEvent: ({category, action, label, value}) => {
                    window.someOtherTracker({
                        category,
                        customAction: action,
                        label,
                        value,
                        dummy: 'xxx'
                    });
                }
            });

            sendEvent({
                category: 'some cat',
                action: 'some act',
                label: 'some lab',
                value: 'some val'
            });

            expect(getNrOfGaCalls()).toEqual(0);

            expect(window.someOtherTracker.mock.calls.length).toEqual(1);
            expect(window.someOtherTracker.mock.calls[0][0]).toEqual({
                category: 'some cat',
                customAction: 'some act',
                label: 'some lab',
                value: 'some val',
                dummy: 'xxx'
            });
        });
    });

    function getNrOfGaCalls() {
        return window.ga.mock.calls.length;
    }

    function getGaCallParams(callNr = 0) {
        return window.ga.mock.calls[callNr];
    }
});