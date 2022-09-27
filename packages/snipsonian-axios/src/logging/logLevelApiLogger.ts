import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { obscureObjectProps } from '@snipsonian/core/src/object/manipulation/obscureObjectProps';
import getErrorStatus from '../error/getErrorStatus';
import { IAxiosApiLogger } from './types';

/**
 * This logger will log the api calls (request, reply, error, ...)
 * on a configurable log level:
 * - for each api request, the main info is by default logged on 'info' level
 * - while the request details are by default logged on 'debug' level
 * - --> so if the logLevel of the provided logger is on 'warn', then the api requests will not be logged
 * - api error responses are by default logged on 'error' level
 */

type TConfigurableLogLevel = keyof ILogLevelLogger;

interface ILoggerFunction {
    (msg: string, ...optionalArgs: unknown[]): void;
    (obj: unknown, msg?: string, ...optionalArgs: unknown[]): void;
}

export interface ILogLevelLogger {
    trace: ILoggerFunction;
    debug: ILoggerFunction;
    info: ILoggerFunction;
    warn: ILoggerFunction;
    error: ILoggerFunction;
    fatal: ILoggerFunction;
}

interface ILogLevelApiLoggerConfig {
    isApiLoggingEnabled?: () => boolean;
    logger: ILogLevelLogger;
    requestLogLevel?: TConfigurableLogLevel;
    requestDetailLogLevel?: TConfigurableLogLevel;
    responseLogLevel?: TConfigurableLogLevel;
    responseDetailLogLevel?: TConfigurableLogLevel;
    errorLogLevel?: TConfigurableLogLevel;
    errorDetailLogLevel?: TConfigurableLogLevel;
    cancelLogLevel?: TConfigurableLogLevel;
}

export function createLogLevelApiLogger({
    isApiLoggingEnabled,
    logger,
    requestLogLevel = 'info',
    requestDetailLogLevel = 'debug',
    responseLogLevel = 'info',
    responseDetailLogLevel = 'trace',
    errorLogLevel = 'error',
    errorDetailLogLevel = 'debug',
    cancelLogLevel = 'warn',
}: ILogLevelApiLoggerConfig): IAxiosApiLogger {
    const shouldLog = isApiLoggingEnabled ? isApiLoggingEnabled() : true;

    return {
        logRequest,
        logResponse,
        logErrorResponse,
        logCancelledRequest,
    };

    function logRequest(request: AxiosRequestConfig): void {
        if (shouldLog) {
            const { method, url, data, timeout, responseType } = request;

            logger[requestLogLevel](`[REQUEST] ${method} ${url}`);

            logger[requestDetailLogLevel]({
                data,
                timeout,
                responseType,
            }, '[request-detail]');
        }
    }

    function logResponse(response: AxiosResponse): void {
        if (shouldLog) {
            const { status, data, config } = response;

            logger[responseLogLevel](`[RESPONSE] ${config.method} ${config.url} ${status}`);

            logger[responseDetailLogLevel]({
                data,
            }, '[response-detail]');
        }
    }

    function logErrorResponse(error: AxiosError): void {
        if (shouldLog) {
            const status = getErrorStatus(error);
            const { config, code, message, response } = error;
            const { statusText, headers, data } = response || {};

            logger[errorLogLevel](`[ERROR-RESPONSE] ${config.method} ${config.url} ${status} ${statusText || message}`);

            logger[errorDetailLogLevel]({
                code,
                message,
                response: {
                    statusText,
                    headers,
                    config: obscureObjectProps({
                        obj: response?.config,
                        propPathsToObscure: ['headers.Authorization'],
                    }),
                    data,
                },
            }, '[error-detail]');
        }
    }

    function logCancelledRequest(error: AxiosError): void {
        if (shouldLog) {
            const { config } = error;

            logger[cancelLogLevel](`[CANCELLED-REQUEST] ${config.method} ${config.url}`);
        }
    }
}
