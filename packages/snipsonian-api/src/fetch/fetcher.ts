/* global window */

import isSet from '../../../snipsonian-core/src/is/isSet';
import isNumber from '../../../snipsonian-core/src/is/isNumber';
import createFetchRequest from './createFetchRequest';
import rejectPromiseOnHttpErrorStatus from './rejectPromiseOnHttpErrorStatus';

let fetchFn = window.fetch;

export const DEFAULT_TIMEOUT_IN_MILLIS = 3000;
export const ERROR_CODE_TIMEOUT = 'TIMEOUT';

const fetcher = {
    fetch: ({
        url,
        method = 'GET',
        body,
        nameValueHeaderPairs,
        timeoutInMillis = DEFAULT_TIMEOUT_IN_MILLIS,
    }) => {
        const fetchRequest = createFetchRequest({
            url,
            method,
            body,
            nameValueHeaderPairs,
        });

        return new Promise((resolve, reject) => {
            let timer;

            if (isValidTimeoutInMillis(timeoutInMillis)) {
                timer = window.setTimeout(
                    onTimeout,
                    timeoutInMillis,
                );
            }

            fetchFn.call(window, fetchRequest)
                .then((response) => {
                    if (isSet(timer)) {
                        window.clearTimeout(timer);
                    }
                    resolve(rejectPromiseOnHttpErrorStatus(response));
                })
                .catch((error) => {
                    reject(error);
                });

            function onTimeout() {
                // eslint-disable-next-line prefer-promise-reject-errors
                reject({
                    status: 0,
                    errorCode: ERROR_CODE_TIMEOUT,
                });
            }
        });
    },

    /**
     * You can override the actual fetch function e.g. with a dummy when running unit tests
     */
    setFetch: (fetch) => {
        fetchFn = fetch;
    },
};

export default fetcher;

function isValidTimeoutInMillis(timeoutInMillis) {
    return isSet(timeoutInMillis) && isNumber(timeoutInMillis) && (timeoutInMillis > 0);
}
