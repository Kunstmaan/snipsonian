import isServiceWorkerSupported from './isServiceWorkerSupported';

export const SW_STATUS = {
    CONTROLLED: 'controlled',
    SUPPORTED: 'supported',
    UNSUPPORTED: 'unsupported'
};

export default function getServiceWorkerStatus() {
    if (isServiceWorkerSupported()) {
        return navigator.serviceWorker.controller ? SW_STATUS.CONTROLLED : SW_STATUS.SUPPORTED;
    } else {
        return SW_STATUS.UNSUPPORTED;
    }
}
