import gaTracker from './gaTracker';
import Mock = jest.Mock;

describe('gaTracker:', () => {
    beforeEach(() => {
        window.ga = jest.fn();
    });

    describe('sendVirtualPageview()', () => {
        it('sets the ga page with the input virtual url + sends a pageview to ga', () => {
            gaTracker.sendVirtualPageview({ virtualUrl: '/some/virtual/page' });

            expect(getNrOfGaCalls()).toEqual(2);

            expect(getGaCallParams()[0]).toEqual('set');
            expect(getGaCallParams()[1]).toEqual('page');
            expect(getGaCallParams()[2]).toEqual('/some/virtual/page');

            expect(getGaCallParams(1)[0]).toEqual('send');
            expect(getGaCallParams(1)[1]).toEqual('pageview');
        });

        it('the custom input object can be used to also send custom dimensions and metrics', () => {
            gaTracker.sendVirtualPageview({
                virtualUrl: '/some/virtual/page',
                custom: {
                    dimension15: 'My Custom Dimension',
                    metric8: 24.75,
                },
            });

            expect(getGaCallParams(1)[2]).toEqual({
                dimension15: 'My Custom Dimension',
                metric8: 24.75,
            });
        });
    });

    describe('sendEvent()', () => {
        it('sends a hit of type event to ga (nonInteraction default = false)', () => {
            gaTracker.sendEvent({
                category: 'some cat',
                action: 'some act',
                label: 'some lab',
                value: 123,
            });

            expect(getNrOfGaCalls()).toEqual(1);

            expect(getGaCallParams()[0]).toEqual('send');
            expect(getGaCallParams()[1]).toEqual({
                hitType: 'event',
                eventCategory: 'some cat',
                eventAction: 'some act',
                eventLabel: 'some lab',
                eventValue: 123,
                nonInteraction: false,
            });
        });

        it('the custom input object can be used to also send custom dimensions and metrics', () => {
            gaTracker.sendEvent({
                category: 'some cat',
                action: 'some act',
                label: 'some lab',
                value: 789,
                isNonInteraction: true,
                custom: {
                    dimension4: 'My Custom Dimension',
                },
            });

            expect(getGaCallParams()[1]).toEqual({
                hitType: 'event',
                eventCategory: 'some cat',
                eventAction: 'some act',
                eventLabel: 'some lab',
                eventValue: 789,
                nonInteraction: true,
                dimension4: 'My Custom Dimension',
            });
        });
    });

    describe('sendSocial()', () => {
        it('sends a hit of type social to ga', () => {
            gaTracker.sendSocial({
                network: 'soc netw +',
                action: 'like',
                target: 'http://some.url',
            });

            expect(getNrOfGaCalls()).toEqual(1);

            expect(getGaCallParams()[0]).toEqual('send');
            expect(getGaCallParams()[1]).toEqual({
                hitType: 'social',
                socialNetwork: 'soc netw +',
                socialAction: 'like',
                socialTarget: 'http://some.url',
            });
        });
    });

    describe('sendTiming()', () => {
        it('sends a hit of type timing to ga', () => {
            gaTracker.sendTiming({
                category: 'some timing cat',
                timingVar: 'custom time final paint',
                value: 742,
                label: 'some optional label',
            });

            expect(getNrOfGaCalls()).toEqual(1);

            expect(getGaCallParams()[0]).toEqual('send');
            expect(getGaCallParams()[1]).toEqual({
                hitType: 'timing',
                timingCategory: 'some timing cat',
                timingVar: 'custom time final paint',
                timingValue: 742,
                timingLabel: 'some optional label',
            });
        });
    });

    describe('sendException()', () => {
        it('sends a hit of type exception to ga (exFatal default = false)', () => {
            gaTracker.sendException({
                description: 'some error desc',
            });

            expect(getNrOfGaCalls()).toEqual(1);

            expect(getGaCallParams()[0]).toEqual('send');
            expect(getGaCallParams()[1]).toEqual({
                hitType: 'exception',
                exDescription: 'some error desc',
                exFatal: false,
            });
        });
    });

    function getNrOfGaCalls(): number {
        return (window.ga as Mock).mock.calls.length;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function getGaCallParams(callNr = 0): any[] {
        return (window.ga as Mock).mock.calls[callNr];
    }
});
