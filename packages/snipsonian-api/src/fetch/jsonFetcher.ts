import fetcher, { DEFAULT_TIMEOUT_IN_MILLIS } from './fetcher';
import { RequestMethod } from './createFetchRequest';

const jsonFetcher = {
    fetch: ({
        url,
        method = RequestMethod.Get,
        body,
        nameValueHeaderPairs = {},
        timeoutInMillis = DEFAULT_TIMEOUT_IN_MILLIS,
        mapResponseJson = (json) => json,
    }: {
        url: string,
        method: RequestMethod,
        body?: object,
        nameValueHeaderPairs?: object,
        timeoutInMillis?: number,
        mapResponseJson?: (json: JSON) => object,
    }) => {
        const adjustedHeaders = {
            ...nameValueHeaderPairs,
            'Content-Type': 'application/json',
        };

        return fetcher.fetch({
            url,
            method,
            body: JSON.stringify(body),
            nameValueHeaderPairs: adjustedHeaders,
            timeoutInMillis,
        })
            .then((response: Response) => response.json())
            .then(mapResponseJson);
    },
};

export default jsonFetcher;
