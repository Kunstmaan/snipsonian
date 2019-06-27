export interface IHeaders {
    [key: string]: string;
}

export enum AutomaticHeaderType {
    ALL_REQUEST_METHODS = 'ALL_REQUEST_METHODS',
    NON_GET = 'NON_GET',
}

/* Keep in sync with AutomaticHeaderType */
export interface IAutomaticHeadersMap {
    ALL_REQUEST_METHODS: IHeaders;
    NON_GET: IHeaders;
}

export const HEADER_NAMES = {
    CONTENT_DISPOSITION: 'content-disposition',
    CONTENT_TYPE: 'Content-Type',
};

export const CONTENT_TYPES = {
    json: 'application/json',
};
