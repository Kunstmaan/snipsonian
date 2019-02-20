/* global Request Headers */

export enum RequestMethod {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Delete = 'DELETE',
}

export interface IFetchRequestConfig {
    method: RequestMethod;
    body?: object | string;
    headers?: Headers;
}

export default function createFetchRequest({
    url,
    method = RequestMethod.Get,
    body,
    nameValueHeaderPairs = {},
}: {
    url: string,
    method: RequestMethod,
    body?: object | string,
    nameValueHeaderPairs?: object,
}) {
    const config: IFetchRequestConfig = {
        method,
    };

    if (body) {
        config.body = {};
    }

    appendHeadersToConfig(config, nameValueHeaderPairs);

    return new Request(url, config as RequestInit);
}

function appendHeadersToConfig(config: IFetchRequestConfig, nameValueHeaderPairs: object) {
    const headerNames = Object.getOwnPropertyNames(nameValueHeaderPairs);

    if (headerNames && headerNames.length > 0) {
        config.headers = new Headers();

        headerNames.forEach((headerName) => {
            const value = nameValueHeaderPairs[headerName];
            config.headers.append(headerName, value);
        });
    }
}
