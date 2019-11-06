import { Canceler } from 'axios';
import { IUrlParams } from '@snipsonian/core/src/url/types';
import { IHeaders } from '../header/types';

export enum REQUEST_METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export const RESPONSE_TYPES = {
    json: 'json',
    text: 'text',
    blob: 'blob',
};

export type TResponseMapper<Result, ResponseData> = (response: { data: ResponseData; headers: IHeaders }) => Result;

export type TRequestWrapperPromise<Result> = Promise<Result> & { cancelRequest?: Canceler };

export interface IBaseRequestConfig<Result, ResponseData> {
    url: string;
    baseUrl?: string;
    pathParams?: IUrlParams;
    queryParams?: IUrlParams;
    headers?: IHeaders;
    responseType?: string;
    mapResponse?: TResponseMapper<Result, ResponseData>;
    timeoutInMillis?: number;
}

export interface IBodyRequestConfig<Result, ResponseData> extends IBaseRequestConfig<Result, ResponseData> {
    body?: object | string;
    contentType?: string;
}
