/* global navigator */

export default function isServiceWorkerSupported() {
    return navigator && ('serviceWorker' in navigator);
}