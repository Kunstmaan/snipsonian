/* global window */

import gtmTracker from './gtmTracker';

describe('gtmTracker:', () => {
    beforeEach(() => {
        window.dataLayer = [];
    });

    describe('sendVirtualPageview()', () => {
        it('sends a virtualPageView event', () => {
            gtmTracker.sendVirtualPageview({
                virtualUrl: 'dashboard',
            });

            expect(window.dataLayer.length).toEqual(1);
            expect(window.dataLayer[0]).toEqual({
                event: 'virtualPageView',
                virtualUrl: 'dashboard',
            });
        });

        it('a default url prefix can be set', () => {
            gtmTracker.setVirtualUrlPrefix('/some-url-prefix/');

            gtmTracker.sendVirtualPageview({
                virtualUrl: 'contact',
            });

            expect(window.dataLayer.length).toEqual(1);
            expect(window.dataLayer[0]).toEqual({
                event: 'virtualPageView',
                virtualUrl: '/some-url-prefix/contact',
            });

            gtmTracker.setVirtualUrlPrefix('');
        });

        it('the custom object can be used to pass additional event fields', () => {
            gtmTracker.sendVirtualPageview({
                virtualUrl: 'page1',
                custom: {
                    someField: 'some value',
                },
            });

            gtmTracker.sendVirtualPageview({
                virtualUrl: 'page2',
                custom: {
                    otherField: 24,
                },
            });

            expect(window.dataLayer.length).toEqual(2);
            expect(window.dataLayer[0]).toEqual({
                event: 'virtualPageView',
                virtualUrl: 'page1',
                someField: 'some value',
            });
            expect(window.dataLayer[1]).toEqual({
                event: 'virtualPageView',
                virtualUrl: 'page2',
                otherField: 24,
            });
        });
    });

    describe('sendEvent()', () => {
        it('sends a standard event', () => {
            gtmTracker.sendEvent({
                category: 'contact-form',
                action: 'submit',
            });

            expect(window.dataLayer.length).toEqual(1);
            expect(window.dataLayer[0]).toEqual({
                event: 'event',
                eventCategory: 'contact-form',
                eventAction: 'submit',
                nonInteraction: false,
            });
        });

        it('additional event fields can be passed', () => {
            gtmTracker.sendEvent({
                category: 'contact-form',
                action: 'submit',
                label: 'some label',
                value: 777,
                isNonInteraction: true,
                custom: {
                    someCustomField: 'qwerty',
                },
            });

            expect(window.dataLayer.length).toEqual(1);
            expect(window.dataLayer[0]).toEqual({
                event: 'event',
                eventCategory: 'contact-form',
                eventAction: 'submit',
                eventLabel: 'some label',
                eventValue: 777,
                nonInteraction: true,
                someCustomField: 'qwerty',
            });
        });
    });

    describe('sendTiming()', () => {
        it('sends a timing event', () => {
            gtmTracker.sendTiming({
                category: 'performance',
                timingVar: 'timeToFirstPaint',
                value: 748,
            });

            expect(window.dataLayer.length).toEqual(1);
            expect(window.dataLayer[0]).toEqual({
                event: 'timing',
                timingCategory: 'performance',
                timingVar: 'timeToFirstPaint',
                timingValue: 748,
            });
        });

        it('additional timing event fields can be passed', () => {
            gtmTracker.sendTiming({
                category: 'performance',
                timingVar: 'timeToFirstPaint',
                value: 748,
                label: 'some label',
                custom: {
                    otherField: 123,
                    anotherField: 'QED',
                },
            });

            expect(window.dataLayer.length).toEqual(1);
            expect(window.dataLayer[0]).toEqual({
                event: 'timing',
                timingCategory: 'performance',
                timingVar: 'timeToFirstPaint',
                timingValue: 748,
                timingLabel: 'some label',
                otherField: 123,
                anotherField: 'QED',
            });
        });
    });
});
