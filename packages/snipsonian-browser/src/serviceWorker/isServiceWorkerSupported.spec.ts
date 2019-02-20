import isServiceWorkerSupported from './isServiceWorkerSupported';

describe('isServiceWorkerSupported()', () => {
    let origServiceWorker;

    beforeEach(() => {
        origServiceWorker = navigator.serviceWorker;
    });

    afterEach(() => {
        navigator['serviceWorker' as any] = origServiceWorker;
    });

    it('should return false if either serviceworker or navigator are not supported', () => {
        expect(isServiceWorkerSupported()).toBeFalsy();
    });

    it('should return true if serviceworkers are supported', () => {
        navigator['serviceWorker' as any] = true;

        expect(isServiceWorkerSupported()).toBeTruthy();
    });
});
