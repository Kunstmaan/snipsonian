export interface IApiErrorBase<ErrorResponseData extends object> {
    status: number; // http status code
    originatingRequest: {
        method?: string;
        url?: string;
    };
    wasCancelled: boolean;
    response: ErrorResponseData; // will contain the original error response
}

export interface ITraceableApiErrorBase<ErrorResponseData extends object> extends IApiErrorBase<ErrorResponseData> {
    traceableId: string;
}
