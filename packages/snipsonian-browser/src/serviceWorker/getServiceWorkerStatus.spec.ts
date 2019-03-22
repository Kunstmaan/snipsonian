import getServiceWorkerStatus from './getServiceWorkerStatus';
import SERVICE_WORKER_STATUS from './serviceWorkerStatus';

describe('getServiceWorkerStatus()', () => {
    let origServiceWorker;

    beforeEach(() => {
        origServiceWorker = navigator.serviceWorker;
    });

    afterEach(() => {
        navigator['serviceWorker' as any] = origServiceWorker;
    });

    it('should return supported if serviceworker is supported but not active', () => {
        navigator['serviceWorker' as any] = {};

        expect(getServiceWorkerStatus()).toBe(SERVICE_WORKER_STATUS.SUPPORTED);
    });

    it('should return controlled if a serviceworker is currently active', () => {
        navigator['serviceWorker' as any] = {
            controller: true,
        };

        expect(getServiceWorkerStatus()).toBe(SERVICE_WORKER_STATUS.CONTROLLED);
    });

    it('should return unsupported if service workers are not supported', () => {
        delete navigator['serviceWorker' as any];

        expect(getServiceWorkerStatus()).toBe(SERVICE_WORKER_STATUS.UNSUPPORTED);
    });
});
