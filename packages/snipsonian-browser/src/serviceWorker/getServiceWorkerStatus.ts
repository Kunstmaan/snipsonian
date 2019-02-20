import isServiceWorkerSupported from './isServiceWorkerSupported';
import SERVICE_WORKER_STATUS from './serviceWorkerStatus';

export default function getServiceWorkerStatus(): SERVICE_WORKER_STATUS {
    if (isServiceWorkerSupported()) {
        return navigator.serviceWorker.controller
            ? SERVICE_WORKER_STATUS.CONTROLLED
            : SERVICE_WORKER_STATUS.SUPPORTED;
    }

    return SERVICE_WORKER_STATUS.UNSUPPORTED;
}
