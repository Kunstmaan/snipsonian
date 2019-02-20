/* global navigator */

import isServiceWorkerSupported from './isServiceWorkerSupported';
import SW_STATUS from './serviceWorkerStatus';

export default function getServiceWorkerStatus() {
    if (isServiceWorkerSupported()) {
        return navigator.serviceWorker.controller ? SW_STATUS.CONTROLLED : SW_STATUS.SUPPORTED;
    }

    return SW_STATUS.UNSUPPORTED;
}
