import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IGroupLogger } from '@snipsonian/core/src/typings/logging';
import getErrorStatus from '../error/getErrorStatus';

export interface IAxiosApiLogger {
    logRequest: (request: AxiosRequestConfig) => void;
    logResponse: (response: AxiosResponse) => void;
    logErrorResponse: (error: AxiosError) => void;
    logCancelledRequest: (error: AxiosError) => void;
}

interface IAxiosApiLoggerConfig {
    isApiLoggingEnabled?: () => boolean;
    groupLogger: IGroupLogger;
}

export default function getApiLogger({
    isApiLoggingEnabled,
    groupLogger,
}: IAxiosApiLoggerConfig): IAxiosApiLogger {
    const shouldLog = isApiLoggingEnabled ? isApiLoggingEnabled() : true;

    return {
        logRequest,
        logResponse,
        logErrorResponse,
        logCancelledRequest,
    };

    function logRequest(request: AxiosRequestConfig): void {
        if (shouldLog) {
            try {
                groupLogger.startLog(`REQUEST ${request.method} ${request.url}`);
                groupLogger.log('request:', request);
                groupLogger.endLog();
            } catch (error) {
                groupLogger.log('Request could not be logged', error);
            }
        }
    }

    function logResponse(response: AxiosResponse): void {
        if (shouldLog) {
            try {
                groupLogger.startLog(`RESPONSE ${response.config.method} ${response.config.url} ${response.status}`);
                groupLogger.log('data:', response.data);
                groupLogger.endLog();
            } catch (error) {
                groupLogger.log('Response could not be logged', error);
            }
        }
    }

    function logErrorResponse(error: AxiosError): void {
        if (shouldLog) {
            try {
                const status = getErrorStatus(error);

                groupLogger.startLog(`ERROR-RESPONSE ${error.config.method} ${error.config.url} ${status}`);
                groupLogger.log('status:', status);
                groupLogger.log('code:', error.code);
                groupLogger.log('message:', error.message);
                groupLogger.log('response:', error.response);
                groupLogger.endLog();
            } catch (innerError) {
                groupLogger.log('ErrorResponse could not be logged', innerError);
            }
        }
    }

    function logCancelledRequest(error: AxiosError): void {
        if (shouldLog) {
            try {
                groupLogger.log(`CANCELLED REQUEST ${error.config.method} ${error.config.url}`);
            } catch (innerError) {
                groupLogger.log('Cancelled request could not be logged', innerError);
            }
        }
    }
}
