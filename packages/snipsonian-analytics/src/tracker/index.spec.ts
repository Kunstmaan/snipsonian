import { sendVirtualPageview, initTracker, ITracker } from './index';

describe('tracker:', () => {
    let tracked: object[];

    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    const customTracker = {
        sendVirtualPageview: ({ virtualUrl }: { virtualUrl: string }) => {
            tracked.push({
                isCustomTracker: true,
                virtualUrl,
            });
        },
    } as ITracker;

    beforeEach(() => {
        tracked = [];
    });

    describe('sendVirtualPageview()', () => {
        it('throws an error if the tracker was not initialized yet', () => {
            expect(() => sendVirtualPageview({ virtualUrl: 'xxx' }))
                .toThrowError('Tracker was not initialized.');
        });

        it('calls the sendVirtualPageview function of the initialized tracker', () => {
            initTracker(customTracker);

            sendVirtualPageview({ virtualUrl: 'xxx' });

            expect(tracked.length).toEqual(1);
            expect(tracked[0]).toEqual({
                isCustomTracker: true,
                virtualUrl: 'xxx',
            });
        });
    });
});
