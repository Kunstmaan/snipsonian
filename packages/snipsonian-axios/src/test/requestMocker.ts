import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import AxiosMockAdapter from 'axios-mock-adapter';
import { IUrlParams } from '@snipsonian/core/src/url/types';
import constructResourceUrl from '@snipsonian/core/src/url/constructResourceUrl';
import { IHeaders } from '../header/types';
import HTTP_STATUS from '../httpStatus';

export const axiosMock = new AxiosMockAdapter(axios);

export function resetMockHandlers(): void {
    return axiosMock.reset();
}

interface IMockConfig {
    url: string;
    baseUrl?: string;
    pathParams?: IUrlParams;
    queryParams?: IUrlParams;
    onlyMatchUrlStart?: boolean;

    responseStatus?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    responseData: any;
    responseHeaders?: IHeaders;
}

export function mockGetSuccess({
    url,
    baseUrl = '',
    pathParams = {},
    queryParams = {},
    responseStatus = HTTP_STATUS.OK,
    responseData,
    responseHeaders,
    onlyMatchUrlStart = false,
}: IMockConfig): jest.Mock<{}> {
    const urlToMock = getUrlToMock({
        url, baseUrl, pathParams, queryParams, onlyMatchUrlStart,
    });

    const spy = jest.fn();

    axiosMock
        .onGet(urlToMock)
        .reply((axiosConfig) => {
            spy(axiosConfig);
            return [responseStatus, responseData, responseHeaders];
        });

    return spy;
}

export function mockPutSuccess({
    url,
    baseUrl = '',
    pathParams = {},
    queryParams = {},
    responseStatus = HTTP_STATUS.OK,
    responseData,
    responseHeaders,
    onlyMatchUrlStart = false,
}: IMockConfig): jest.Mock<{}> {
    const urlToMock = getUrlToMock({
        url, baseUrl, pathParams, queryParams, onlyMatchUrlStart,
    });

    const spy = jest.fn();

    axiosMock
        .onPut(urlToMock)
        .reply((axiosConfig) => {
            spy(axiosConfig);
            return [responseStatus, responseData, responseHeaders];
        });

    return spy;
}

function getUrlToMock({
    url,
    baseUrl,
    pathParams,
    queryParams,
    onlyMatchUrlStart,
}: {
    url: string;
    baseUrl?: string;
    pathParams?: IUrlParams;
    queryParams?: IUrlParams;
    onlyMatchUrlStart: boolean;
}): string | RegExp {
    const urlToMock = constructResourceUrl({
        url, baseUrl, pathParams, queryParams,
    });

    return onlyMatchUrlStart ? new RegExp(`${urlToMock}.*`) : urlToMock;
}
