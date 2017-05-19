/* global window */

import createFetchRequest from './createFetchRequest';
import rejectPromiseOnHttpErrorStatus from './rejectPromiseOnHttpErrorStatus';

let fetchFn = window.fetch;

const fetcher = {
    fetch: ({
        url,
        method = 'GET',
        body,
        nameValueHeaderPairs
    }) => {
        const fetchRequest = createFetchRequest({
            url,
            method,
            body,
            nameValueHeaderPairs
        });

        return fetchFn.call(window, fetchRequest)
            .then(rejectPromiseOnHttpErrorStatus);
    },

    /**
     * You can override the actual fetch function e.g. with a dummy when running unit tests
     */
    setFetch: (fetch) => {
        fetchFn = fetch;
    }
};

export default fetcher;
