import axios, { AxiosRequestConfig, AxiosError, ResponseType } from 'axios';
import { IApiErrorBase, ITraceableApiErrorBase } from '@snipsonian/core/src/typings/apiErrors';
import constructResourceUrl from '@snipsonian/core/src/url/constructResourceUrl';
import getRandomNumber from '@snipsonian/core/src/number/getRandomNumber';
import { IS_BROWSER } from '@snipsonian/core/src/is/isBrowser';
import { appendAutomaticHeaders, appendContentTypeHeaderIfSet } from '../header/headerManager';
import { CONTENT_TYPES } from '../header/types';
import getErrorStatus from '../error/getErrorStatus';
import generateTraceableApiErrorId from '../error/generateTraceableApiErrorId';
import {
    IGetRequestConfig, IBodyRequestConfig,
    REQUEST_METHODS, RESPONSE_TYPES,
    TResponseMapper, TRequestWrapperPromise, TErrorEnhancer,
} from './types';
import { IAxiosApiLogger } from '../logging/types';

const { CancelToken } = axios;

/* default do nothing with the response headers */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEFAULT_RESPONSE_MAPPER_RETURNS_DATA_AS_IS = ({ data }: { data: any }): any => data;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEFAULT_ERROR_ENHANCER_RETURNS_ERROR_AS_IS = (error: any): any => error;
const DEFAULT_REQUEST_CUSTOM_TRANSFORMER_RETURNS_REQUEST_AS_IS
    = (params: { request: AxiosRequestConfig; customConfig: unknown }): AxiosRequestConfig => params.request;

let nrOfRunningApiCalls = 0;

export function getNrOfRunningApiCalls() {
    return nrOfRunningApiCalls;
}

export interface IRequestWrapper<CustomConfig, ApiErrorClientSide> {
    /* eslint-disable max-len */
    get: <Result, ResponseData = Result>(config: IGetRequestConfig<Result, ResponseData, ApiErrorClientSide> & CustomConfig) => Promise<Result>;
    post: <Result, ResponseData = Result>(config: IBodyRequestConfig<Result, ResponseData, ApiErrorClientSide> & CustomConfig) => Promise<Result>;
    put: <Result, ResponseData = Result>(config: IBodyRequestConfig<Result, ResponseData, ApiErrorClientSide> & CustomConfig) => Promise<Result>;
    patch: <Result, ResponseData = Result>(config: IBodyRequestConfig<Result, ResponseData, ApiErrorClientSide> & CustomConfig) => Promise<Result>;
    remove: <Result, ResponseData = Result>(config: IBodyRequestConfig<Result, ResponseData, ApiErrorClientSide> & CustomConfig) => Promise<Result>;
    /* eslint-enable max-len */
}

export interface IRequestWrapperConfig<CustomConfig, ApiErrorClientSide, OrigApiErrorClientSide = ApiErrorClientSide> {
    apiLogger?: IAxiosApiLogger;
    defaultBaseUrl?: string;
    defaultTimeoutInMillis: number;
    mapError?: (error: OrigApiErrorClientSide) => ApiErrorClientSide;
    onError?: (error: ApiErrorClientSide) => void;
    // eslint-disable-next-line max-len
    requestCustomTransformer?: (params: { request: AxiosRequestConfig; customConfig: CustomConfig }) => AxiosRequestConfig;
    trackNrOfRunningApiCalls?: boolean; // default false
}

export default function getRequestWrapper<
    CustomConfig extends object = {}, // eslint-disable-line @typescript-eslint/ban-types
    ApiErrorClientSide = ITraceableApiErrorBase<{}>, // eslint-disable-line @typescript-eslint/ban-types
    OrigApiErrorClientSide = ApiErrorClientSide,
>({
    apiLogger,
    defaultBaseUrl = '',
    defaultTimeoutInMillis,
    mapError,
    onError,
    requestCustomTransformer = DEFAULT_REQUEST_CUSTOM_TRANSFORMER_RETURNS_REQUEST_AS_IS,
    trackNrOfRunningApiCalls = false,
// eslint-disable-next-line max-len
}: IRequestWrapperConfig<CustomConfig, ApiErrorClientSide, OrigApiErrorClientSide>): IRequestWrapper<CustomConfig, ApiErrorClientSide> {
    const requestWrapper: IRequestWrapper<CustomConfig, ApiErrorClientSide> = {
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
        enhanceError = DEFAULT_ERROR_ENHANCER_RETURNS_ERROR_AS_IS,
        timeoutInMillis = defaultTimeoutInMillis,
        addCacheBuster = false,
        ...customConfig
    }: IGetRequestConfig<Result, ResponseData, ApiErrorClientSide> & CustomConfig): TRequestWrapperPromise<Result> {
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
            enhanceError,
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
        enhanceError = DEFAULT_ERROR_ENHANCER_RETURNS_ERROR_AS_IS,
        timeoutInMillis = defaultTimeoutInMillis,
        ...customConfig
    }: IBodyRequestConfig<Result, ResponseData, ApiErrorClientSide> & CustomConfig): TRequestWrapperPromise<Result> {
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
            enhanceError,
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
        enhanceError = DEFAULT_ERROR_ENHANCER_RETURNS_ERROR_AS_IS,
        timeoutInMillis = defaultTimeoutInMillis,
        ...customConfig
    }: IBodyRequestConfig<Result, ResponseData, ApiErrorClientSide> & CustomConfig): TRequestWrapperPromise<Result> {
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
            enhanceError,
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
        enhanceError = DEFAULT_ERROR_ENHANCER_RETURNS_ERROR_AS_IS,
        timeoutInMillis = defaultTimeoutInMillis,
        ...customConfig
    }: IBodyRequestConfig<Result, ResponseData, ApiErrorClientSide> & CustomConfig): TRequestWrapperPromise<Result> {
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
            enhanceError,
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
        enhanceError = DEFAULT_ERROR_ENHANCER_RETURNS_ERROR_AS_IS,
        timeoutInMillis = defaultTimeoutInMillis,
        ...customConfig
    }: IBodyRequestConfig<Result, ResponseData, ApiErrorClientSide> & CustomConfig): TRequestWrapperPromise<Result> {
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
            enhanceError,
        );
    }

    function executeApiCall<Result, ResponseData>(
        request: AxiosRequestConfig,
        mapResponse: TResponseMapper<Result, ResponseData>,
        enhanceError: TErrorEnhancer<ApiErrorClientSide>,
    ): TRequestWrapperPromise<Result> {
        request.headers = appendAutomaticHeaders(request.headers, request.method as REQUEST_METHODS);

        if (apiLogger) apiLogger.logRequest(request);

        const source = CancelToken.source();
        request.cancelToken = source.token;

        if (trackNrOfRunningApiCalls) {
            nrOfRunningApiCalls += 1;
        }

        const requestPromise = axios(request)
            .then((result) => {
                if (apiLogger) apiLogger.logResponse(result);

                const { data, headers, status, statusText } = result;

                return mapResponse({ data, headers, status, statusText });
            })
            .catch(async (error: AxiosError) => {
                if (!wasApiCancelled(error)) {
                    if (apiLogger) apiLogger.logErrorResponse(error);
                } else if (apiLogger) {
                    apiLogger.logCancelledRequest(error);
                }

                const apiError = await transformError(error, enhanceError);
                if (onError) onError(apiError);
                // eslint-disable-next-line @typescript-eslint/no-throw-literal
                throw apiError;
            })
            .finally(() => {
                if (trackNrOfRunningApiCalls) {
                    nrOfRunningApiCalls -= 1;
                }
            }) as TRequestWrapperPromise<Result>;

        requestPromise.cancelRequest = source.cancel;

        return requestPromise;
    }

    async function transformError(
        error: AxiosError,
        enhanceError: TErrorEnhancer<ApiErrorClientSide>,
    ): Promise<ApiErrorClientSide> {
        const traceableApiError = await toTraceableApiErrorBase(error);
        return mapError
            ? enhanceError(mapError(traceableApiError as unknown as OrigApiErrorClientSide))
            : enhanceError(traceableApiError as unknown as ApiErrorClientSide);
    }

    return requestWrapper;
}

// eslint-disable-next-line @typescript-eslint/ban-types
async function toTraceableApiErrorBase(error: AxiosError): Promise<ITraceableApiErrorBase<{}>> {
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

// eslint-disable-next-line @typescript-eslint/ban-types
async function extractServerErrorResponseData(error: AxiosError): Promise<{}> {
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
        if (IS_BROWSER && responseJson instanceof Blob) {
            try {
                const data = await blobToString(responseJson);
                responseJson = JSON.parse(data);
            } catch (err) {
                // Not a valid json
            }
        }
        return responseJson;
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    return undefined as unknown as IApiErrorBase<{}>;
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
