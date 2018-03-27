import fetcher from './fetcher';

const jsonFetcher = {
    fetch: ({
        url,
        method = 'GET',
        body,
        nameValueHeaderPairs = {},
        mapResponseJson = (json) => json
    }) => {
        /* eslint no-param-reassign: ["error", {"props": false}] */

        nameValueHeaderPairs['Content-Type'] = 'application/json';

        return new Promise((resolve, reject) => {
            fetcher.fetch({
                url,
                method,
                body: JSON.stringify(body),
                nameValueHeaderPairs
            })
                .then((response) => response.json())
                .then((json) => {
                    resolve(mapResponseJson(json));
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }
};

export default jsonFetcher;
