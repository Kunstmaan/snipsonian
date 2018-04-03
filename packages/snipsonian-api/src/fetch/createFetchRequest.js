/* global Request Headers */

export default function createFetchRequest({
    url,
    method = 'GET',
    body,
    nameValueHeaderPairs = {},
}) {
    const config = {
        method,
    };

    if (body) {
        config.body = body;
    }

    appendHeadersToConfig(config, nameValueHeaderPairs);

    return new Request(url, config);
}

function appendHeadersToConfig(config, nameValueHeaderPairs) {
    const headerNames = Object.getOwnPropertyNames(nameValueHeaderPairs);

    if (headerNames && headerNames.length > 0) {
        /* eslint no-param-reassign: ["error", {"props": false}] */
        config.headers = new Headers();

        headerNames.forEach((headerName) => {
            const value = nameValueHeaderPairs[headerName];
            config.headers.append(headerName, value);
        });
    }
}
