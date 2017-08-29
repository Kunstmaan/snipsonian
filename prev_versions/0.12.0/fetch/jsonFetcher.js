import fetcher, {DEFAULT_TIMEOUT_IN_MILLIS} from './fetcher';

const jsonFetcher = {
    fetch: ({
        url,
        method = 'GET',
        body,
        nameValueHeaderPairs = {},
        timeoutInMillis = DEFAULT_TIMEOUT_IN_MILLIS,
        mapResponseJson = (json) => json
    }) => {
        /* eslint no-param-reassign: ["error", {"props": false}] */

        nameValueHeaderPairs['Content-Type'] = 'application/json';

        return fetcher.fetch({
            url,
            method,
            body: JSON.stringify(body),
            nameValueHeaderPairs,
            timeoutInMillis
        })
            .then((response) => response.json())
            .then(mapResponseJson);
    }
};

export default jsonFetcher;
