import isServiceWorkerSupported from './isServiceWorkerSupported';

describe('isServiceWorkerSupported()', () => {
    let origServiceWorker: ServiceWorkerContainer;

    beforeEach(() => {
        origServiceWorker = navigator.serviceWorker;
    });

    afterEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        navigator['serviceWorker' as any] = origServiceWorker;
    });

    it('should return false if either serviceworker or navigator are not supported', () => {
        expect(isServiceWorkerSupported()).toBeFalsy();
    });

    it('should return true if serviceworkers are supported', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        navigator['serviceWorker' as any] = true;

        expect(isServiceWorkerSupported()).toBeTruthy();
    });
});
