import isServiceWorkerSupported from './isServiceWorkerSupported';

export const DEFAULT_SERVICE_WORKER_FILENAME = 'service-worker.js';

const NOOP = (): void => {};

export interface IServiceWorkerConfig {
    swFileName?: string;
    onNewContent?: () => void;
    onContentPrecached?: () => void;
    onRedundant?: () => void;
    onRegistration?: (registration: ServiceWorkerRegistration) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onRegistrationError?: (error: any) => void;
}

export default function registerServiceWorker({
    swFileName = DEFAULT_SERVICE_WORKER_FILENAME,
    onNewContent = NOOP,
    onContentPrecached = NOOP,
    onRedundant = NOOP,
    onRegistration = NOOP,
    onRegistrationError = NOOP,
}: IServiceWorkerConfig = {}): void {
    if (isServiceWorkerSupported()) {
        /**
         * Delay registration until after the page has loaded, to ensure that our
         * precaching requests don't degrade the first visit experience.
         * See https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration
         */
        window.addEventListener('load', () => {
            /**
             * Your service-worker.js *must* be located at the top-level directory relative to your site.
             * It won't be able to control pages unless it's located at the same level or higher than them.
             * *Don't* register service worker file in, e.g., a scripts/ sub-directory!
             * See https://github.com/slightlyoff/ServiceWorker/issues/468
             */
            navigator.serviceWorker
                .register(swFileName)
                .then((registration) => {
                    /* updatefound is fired if service-worker.js changes. */

                    // eslint-disable-next-line no-param-reassign
                    registration.onupdatefound = () => {
                        /**
                         * The updatefound event implies that registration.installing is set; see
                         * https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
                         */
                        const installingWorker = registration.installing;

                        installingWorker.onstatechange = () => {
                            switch (installingWorker.state) {
                                case 'installed':
                                    if (navigator.serviceWorker.controller) {
                                        /**
                                         * At this point, the old content will have been purged and
                                         * the fresh content will have been added to the cache.
                                         * It's the perfect time to display a message in the pages's interface:
                                         * "New content is available; please refresh."
                                         */
                                        onNewContent();
                                    } else {
                                        /**
                                         * At this point, everything has been precached.
                                         * It's the perfect time to display a message:
                                         * "Content is cached for offline use." message.
                                         */
                                        onContentPrecached();
                                    }
                                    break;

                                case 'redundant':
                                    onRedundant();
                                    break;

                                default:
                                    break;
                            }
                        };
                    };

                    onRegistration(registration);
                })
                .catch((e) => {
                    onRegistrationError(e);
                });
        });
    }
}

export function unregister(): void {
    if (isServiceWorkerSupported()) {
        navigator.serviceWorker.ready.then((registration) => {
            registration.unregister();
        });
    }
}
