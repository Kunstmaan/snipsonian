import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IAxiosApiLogger {
    logRequest: (request: AxiosRequestConfig) => void;
    logResponse: (response: AxiosResponse) => void;
    logErrorResponse: (error: AxiosError) => void;
    logCancelledRequest: (error: AxiosError) => void;
}
