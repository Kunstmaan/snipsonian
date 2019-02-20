/* global navigator */

import getServiceWorkerStatus from './getServiceWorkerStatus';
import SW_STATUS from './serviceWorkerStatus';

describe('getServiceWorkerStatus()', () => {
    it('should return supported if serviceworker is supported but not active', () => {
        navigator.serviceWorker = {};

        expect(getServiceWorkerStatus()).toBe(SW_STATUS.SUPPORTED);
    });

    it('should return controlled if a serviceworker is currently active', () => {
        navigator.serviceWorker = {
            controller: true,
        };

        expect(getServiceWorkerStatus()).toBe(SW_STATUS.CONTROLLED);
    });

    it('should return unsupported if service workers are not supported', () => {
        delete navigator.serviceWorker;

        expect(getServiceWorkerStatus()).toBe(SW_STATUS.UNSUPPORTED);
    });
});
