import getServiceWorkerStatus from './getServiceWorkerStatus';
import SERVICE_WORKER_STATUS from './serviceWorkerStatus';

describe('getServiceWorkerStatus()', () => {
    let origServiceWorker: ServiceWorkerContainer;

    beforeEach(() => {
        origServiceWorker = navigator.serviceWorker;
    });

    afterEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        navigator['serviceWorker' as any] = origServiceWorker;
    });

    it('should return supported if serviceworker is supported but not active', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        navigator['serviceWorker' as any] = {};

        expect(getServiceWorkerStatus()).toBe(SERVICE_WORKER_STATUS.SUPPORTED);
    });

    it('should return controlled if a serviceworker is currently active', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        navigator['serviceWorker' as any] = {
            controller: true,
        };

        expect(getServiceWorkerStatus()).toBe(SERVICE_WORKER_STATUS.CONTROLLED);
    });

    it('should return unsupported if service workers are not supported', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete navigator['serviceWorker' as any];

        expect(getServiceWorkerStatus()).toBe(SERVICE_WORKER_STATUS.UNSUPPORTED);
    });
});
