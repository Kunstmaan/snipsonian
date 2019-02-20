export default function isServiceWorkerSupported(): boolean {
    return navigator && ('serviceWorker' in navigator);
}
