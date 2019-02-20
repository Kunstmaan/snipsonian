import getServiceWorkerStatus from './getServiceWorkerStatus';
import SERVICE_WORKER_STATUS from './serviceWorkerStatus';

describe('getServiceWorkerStatus()', () => {
    it('should return supported if serviceworker is supported but not active', () => {
        navigator.serviceWorker = {};

        expect(getServiceWorkerStatus()).toBe(SERVICE_WORKER_STATUS.SUPPORTED);
    });

    it('should return controlled if a serviceworker is currently active', () => {
        navigator.serviceWorker = {
            controller: true,
        };

        expect(getServiceWorkerStatus()).toBe(SERVICE_WORKER_STATUS.CONTROLLED);
    });

    it('should return unsupported if service workers are not supported', () => {
        delete navigator.serviceWorker;

        expect(getServiceWorkerStatus()).toBe(SERVICE_WORKER_STATUS.UNSUPPORTED);
    });
});
