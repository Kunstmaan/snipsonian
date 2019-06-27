import { IKeyValuePair } from '@snipsonian/core/src/typings/patterns';
import isSet from '@snipsonian/core/src/is/isSet';
import { AutomaticHeaderType, HEADER_NAMES, IAutomaticHeadersMap, IHeaders } from './types';
import { REQUEST_METHODS } from '../request/types';

const automaticHeaders: IAutomaticHeadersMap = {
    ALL_REQUEST_METHODS: {},
    NON_GET: {},
};

export function getAutomaticHeaders(requestMethod: REQUEST_METHODS): IHeaders {
    if (requestMethod === REQUEST_METHODS.GET) {
        return automaticHeaders.ALL_REQUEST_METHODS;
    }

    return {
        ...automaticHeaders.ALL_REQUEST_METHODS,
        ...automaticHeaders.NON_GET,
    };
}

export function addAutomaticHeader(type: AutomaticHeaderType, ...keyValuePairs: IKeyValuePair<string, string>[]): void {
    automaticHeaders[type] = keyValuePairs
        .reduce(
            (headersAccumulator, keyValuePair) => ({
                ...headersAccumulator,
                [keyValuePair.key]: keyValuePair.value,
            }),
            automaticHeaders[type],
        );
}

export function isAutomaticHeaderSet(type: AutomaticHeaderType, headerName: string): boolean {
    return !!automaticHeaders[type][headerName];
}

export function clearAutomaticHeader(type: AutomaticHeaderType, headerName: string): void {
    delete automaticHeaders[type][headerName];
}

export function appendAutomaticHeaders(headers: IHeaders, requestMethod: REQUEST_METHODS): IHeaders {
    return {
        ...getAutomaticHeaders(requestMethod),
        ...headers,
    };
}

export function appendContentTypeHeaderIfSet(headers: IHeaders, contentType: string): IHeaders {
    if (isSet(contentType)) {
        return {
            [HEADER_NAMES.CONTENT_TYPE]: contentType,
            ...headers,
        };
    }

    return headers;
}
