import axios, { AxiosRequestConfig, AxiosError, ResponseType } from 'axios';
import { IApiErrorBase, ITraceableApiErrorBase } from '@snipsonian/core/src/typings/apiErrors';
import constructResourceUrl from '@snipsonian/core/src/url/constructResourceUrl';
import getRandomNumber from '@snipsonian/core/src/number/getRandomNumber';
import {
    appendAutomaticHeaders, appendContentTypeHeaderIfSet,
} from '../header/headerManager';
import { CONTENT_TYPES } from '../header/types';
import getErrorStatus from '../error/getErrorStatus';
import { IAxiosApiLogger } from '../logging/getApiLogger';
import {
    IGetRequestConfig, IBodyRequestConfig,
    REQUEST_METHODS, RESPONSE_TYPES,
    TResponseMapper, TRequestWrapperPromise,
} from './types';
import generateTraceableApiErrorId from '../error/generateTraceableApiErrorId';

const { CancelToken } = axios;

/* default do nothing with the response headers */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEFAULT_RESPONSE_MAPPER_RETURNS_DATA_AS_IS = ({ data }: { data: any }): any => data;
const DEFAULT_REQUEST_CUSTOM_TRANSFORMER_RETURNS_REQUEST_AS_IS
    = (params: { request: AxiosRequestConfig; customConfig: object }): AxiosRequestConfig => params.request;

export interface IRequestWrapper<CustomConfig> {
    /* eslint-disable max-len */
    get: <Result, ResponseData = Result>(config: IGetRequestConfig<Result, ResponseData> & CustomConfig) => Promise<Result>;
    post: <Result, ResponseData = Result>(config: IBodyRequestConfig<Result, ResponseData> & CustomConfig) => Promise<Result>;
    put: <Result, ResponseData = Result>(config: IBodyRequestConfig<Result, ResponseData> & CustomConfig) => Promise<Result>;
    patch: <Result, ResponseData = Result>(config: IBodyRequestConfig<Result, ResponseData> & CustomConfig) => Promise<Result>;
    remove: <Result, ResponseData = Result>(config: IBodyRequestConfig<Result, ResponseData> & CustomConfig) => Promise<Result>;
    /* eslint-enable max-len */
}

export interface IRequestWrapperConfig<CustomConfig, ResultingApiError, TraceableApiError> {
    apiLogger?: IAxiosApiLogger;
    defaultBaseUrl?: string;
    defaultTimeoutInMillis: number;
    mapError?: (error: TraceableApiError) => ResultingApiError;
    onError?: (error: ResultingApiError) => void;
    // eslint-disable-next-line max-len
    requestCustomTransformer?: (params: { request: AxiosRequestConfig; customConfig: CustomConfig }) => AxiosRequestConfig;
}

export default function getRequestWrapper<
    CustomConfig extends object = object,
    ResultingApiError = ITraceableApiErrorBase<object>,
    TraceableApiError = ITraceableApiErrorBase<object>,
>({
    apiLogger,
    defaultBaseUrl = '',
    defaultTimeoutInMillis,
    mapError,
    onError,
    requestCustomTransformer = DEFAULT_REQUEST_CUSTOM_TRANSFORMER_RETURNS_REQUEST_AS_IS,
}: IRequestWrapperConfig<CustomConfig, ResultingApiError, TraceableApiError>): IRequestWrapper<CustomConfig> {
    const requestWrapper: IRequestWrapper<CustomConfig> = {
        get,
        post,
        put,
        patch,
        remove,
    };

    function get<Result, ResponseData = Result>({
        url,
        baseUrl = defaultBaseUrl,
        pathParams = {},
        queryParams = {},
        headers = {},
        responseType = RESPONSE_TYPES.json,
        mapResponse = DEFAULT_RESPONSE_MAPPER_RETURNS_DATA_AS_IS,
        timeoutInMillis = defaultTimeoutInMillis,
        addCacheBuster = false,
        ...customConfig
    }: IGetRequestConfig<Result, ResponseData> & CustomConfig): TRequestWrapperPromise<Result> {
        if (addCacheBuster) {
            // eslint-disable-next-line no-param-reassign
            queryParams['cache-buster'] = getRandomNumber({ min: 100000, max: 999999 });
        }

        const request: AxiosRequestConfig = {
            responseType: responseType as ResponseType,
            url: constructResourceUrl({
                url, baseUrl, pathParams, queryParams,
            }),
            method: REQUEST_METHODS.GET,
            timeout: timeoutInMillis,
            headers,
        };

        return executeApiCall<Result, ResponseData>(
            requestCustomTransformer({ request, customConfig: customConfig as CustomConfig }),
            mapResponse,
        );
    }

    function post<Result, ResponseData = Result>({
        url,
        baseUrl = defaultBaseUrl,
        pathParams = {},
        queryParams = {},
        body = {},
        headers = {},
        responseType = RESPONSE_TYPES.json,
        contentType = CONTENT_TYPES.json,
        mapResponse = DEFAULT_RESPONSE_MAPPER_RETURNS_DATA_AS_IS,
        timeoutInMillis = defaultTimeoutInMillis,
        ...customConfig
    }: IBodyRequestConfig<Result, ResponseData> & CustomConfig): TRequestWrapperPromise<Result> {
        const request: AxiosRequestConfig = {
            responseType: responseType as ResponseType,
            url: constructResourceUrl({
                url, baseUrl, pathParams, queryParams,
            }),
            data: body,
            method: REQUEST_METHODS.POST,
            timeout: timeoutInMillis,
            headers: appendContentTypeHeaderIfSet(headers, contentType),
        };

        return executeApiCall<Result, ResponseData>(
            requestCustomTransformer({ request, customConfig: customConfig as CustomConfig }),
            mapResponse,
        );
    }

    function put<Result, ResponseData = Result>({
        url,
        baseUrl = defaultBaseUrl,
        pathParams = {},
        queryParams = {},
        body = {},
        headers = {},
        responseType = RESPONSE_TYPES.json,
        contentType = CONTENT_TYPES.json,
        mapResponse = DEFAULT_RESPONSE_MAPPER_RETURNS_DATA_AS_IS,
        timeoutInMillis = defaultTimeoutInMillis,
        ...customConfig
    }: IBodyRequestConfig<Result, ResponseData> & CustomConfig): TRequestWrapperPromise<Result> {
        const request: AxiosRequestConfig = {
            responseType: responseType as ResponseType,
            url: constructResourceUrl({
                url, baseUrl, pathParams, queryParams,
            }),
            data: body,
            method: REQUEST_METHODS.PUT,
            timeout: timeoutInMillis,
            headers: appendContentTypeHeaderIfSet(headers, contentType),
        };

        return executeApiCall<Result, ResponseData>(
            requestCustomTransformer({ request, customConfig: customConfig as CustomConfig }),
            mapResponse,
        );
    }

    function patch<Result, ResponseData = Result>({
        url,
        baseUrl = defaultBaseUrl,
        pathParams = {},
        queryParams = {},
        body = {},
        headers = {},
        responseType = RESPONSE_TYPES.json,
        contentType = CONTENT_TYPES.json,
        mapResponse = DEFAULT_RESPONSE_MAPPER_RETURNS_DATA_AS_IS,
        timeoutInMillis = defaultTimeoutInMillis,
        ...customConfig
    }: IBodyRequestConfig<Result, ResponseData> & CustomConfig): TRequestWrapperPromise<Result> {
        const request: AxiosRequestConfig = {
            responseType: responseType as ResponseType,
            url: constructResourceUrl({
                url, baseUrl, pathParams, queryParams,
            }),
            data: body,
            method: REQUEST_METHODS.PATCH,
            timeout: timeoutInMillis,
            headers: appendContentTypeHeaderIfSet(headers, contentType),
        };

        return executeApiCall<Result, ResponseData>(
            requestCustomTransformer({ request, customConfig: customConfig as CustomConfig }),
            mapResponse,
        );
    }

    function remove<Result, ResponseData = Result>({
        url,
        baseUrl = defaultBaseUrl,
        pathParams = {},
        queryParams = {},
        body = {},
        headers = {},
        responseType = RESPONSE_TYPES.json,
        contentType = CONTENT_TYPES.json,
        mapResponse = DEFAULT_RESPONSE_MAPPER_RETURNS_DATA_AS_IS,
        timeoutInMillis = defaultTimeoutInMillis,
        ...customConfig
    }: IBodyRequestConfig<Result, ResponseData> & CustomConfig): TRequestWrapperPromise<Result> {
        const request: AxiosRequestConfig = {
            responseType: responseType as ResponseType,
            url: constructResourceUrl({
                url, baseUrl, pathParams, queryParams,
            }),
            data: body,
            method: REQUEST_METHODS.DELETE,
            timeout: timeoutInMillis,
            headers: appendContentTypeHeaderIfSet(headers, contentType),
        };

        return executeApiCall<Result, ResponseData>(
            requestCustomTransformer({ request, customConfig: customConfig as CustomConfig }),
            mapResponse,
        );
    }

    function executeApiCall<Result, ResponseData>(
        request: AxiosRequestConfig,
        mapResponse: TResponseMapper<Result, ResponseData>,
    ): TRequestWrapperPromise<Result> {
        request.headers = appendAutomaticHeaders(request.headers, request.method as REQUEST_METHODS);

        if (apiLogger) apiLogger.logRequest(request);

        const source = CancelToken.source();
        request.cancelToken = source.token;

        const requestPromise = axios(request)
            .then((result) => {
                if (apiLogger) apiLogger.logResponse(result);

                const { data, headers } = result;

                return mapResponse({ data, headers });
            })
            .catch(async (error: AxiosError) => {
                if (!wasApiCancelled(error)) {
                    if (apiLogger) apiLogger.logErrorResponse(error);
                } else if (apiLogger) {
                    apiLogger.logCancelledRequest(error);
                }

                const apiError = await transformError(error);
                if (onError) onError(apiError);
                // eslint-disable-next-line @typescript-eslint/no-throw-literal
                throw apiError;
            }) as TRequestWrapperPromise<Result>;

        requestPromise.cancelRequest = source.cancel;

        return requestPromise;
    }

    async function transformError(error: AxiosError): Promise<ResultingApiError> {
        const traceableApiError = await toTraceableApiErrorBase(error);
        return mapError
            ? mapError(traceableApiError as unknown as TraceableApiError)
            : traceableApiError as unknown as ResultingApiError;
    }

    return requestWrapper;
}

async function toTraceableApiErrorBase(error: AxiosError): Promise<ITraceableApiErrorBase<object>> {
    const serverErrorResponse = await extractServerErrorResponseData(error);
    const requestMethod = error.config && error.config.method && error.config.method.toUpperCase();
    const wasCancelled = wasApiCancelled(error);

    const requestUrl = error.config && error.config.url && constructResourceUrl({
        url: error.config.url,
        baseUrl: error.config.baseURL,
        queryParams: error.config.params,
    });

    return {
        status: getErrorStatus(error),
        originatingRequest: {
            url: requestUrl,
            method: requestMethod,
        },
        wasCancelled,
        traceableId: generateTraceableApiErrorId(),
        response: serverErrorResponse,
    };
}

async function extractServerErrorResponseData(error: AxiosError): Promise<object> {
    if (error.response) {
        let responseJson = error.response.data;
        // Some browsers like IE don't parse the JSON automatically
        if (typeof responseJson !== 'object') {
            try {
                responseJson = JSON.parse(responseJson);
            } catch (err) {
                // Not a valid json
            }
        }
        if (responseJson instanceof Blob) {
            try {
                const data = await blobToString(responseJson);
                responseJson = JSON.parse(data);
            } catch (err) {
                // Not a valid json
            }
        }
        return responseJson;
    }
    return undefined as unknown as IApiErrorBase<object>;
}

function wasApiCancelled(error: AxiosError): boolean {
    return axios.isCancel(error);
}

function blobToString(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result as string);
        };
        reader.onerror = (err) => reject(err);
        reader.readAsText(blob);
    });
}
