import isServiceWorkerSupported from './isServiceWorkerSupported';

describe('isServiceWorkerSupported()', () => {
    it('should return false if either serviceworker or navigator are not supported', () => {
        expect(isServiceWorkerSupported()).toBeFalsy();
    });

    it('should return true if serviceworkers are supported', () => {
        navigator.serviceWorker = true;

        expect(isServiceWorkerSupported()).toBeTruthy();
    });
});
