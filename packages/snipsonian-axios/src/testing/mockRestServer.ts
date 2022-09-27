/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { setupServer, SetupServerApi } from 'msw/node';
import { IUrlParams } from '@snipsonian/core/src/url/types';
import { IHeaders } from '../header/types';
import { REQUEST_METHODS } from '../request/types';

export interface IRestServerMock {
    /* to add test-specific handlers */
    addRuntimeHandlers: (...runtimeHandlers: IRestHandlerMock[]) => void;
    /* to remove the added test-specific handlers (does not remove the default ones) */
    removeRuntimeHandlers: () => void;
    stopServer: () => void;
}

export interface IRestHandlerMock {
    method?: REQUEST_METHODS; // default GET
    url: string;
    baseApiUrl?: string; /* if set, this will overrule the defaultBaseApiUrl */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onRequest: (onRequestProps: IOnRequestProps<any>) => any;
    status?: number; // default 200
}

interface IOnRequestProps<RequestBody> {
    headers: IHeaders;
    params: IUrlParams;
    body: RequestBody;
}

const METHOD_HANDLER_MAP = {
    [REQUEST_METHODS.GET]: rest.get,
    [REQUEST_METHODS.POST]: rest.post,
    [REQUEST_METHODS.PUT]: rest.put,
    [REQUEST_METHODS.PATCH]: rest.patch,
    [REQUEST_METHODS.DELETE]: rest.delete,
};

let savedRestServerMock: IRestServerMock = null;

export function setupRestServerMock(
    defaultHandlers: IRestHandlerMock[] = [],
    {
        saveServerInVar = true,
        defaultBaseApiUrl,
    }: {
        saveServerInVar?: boolean; // default true
        defaultBaseApiUrl?: string;
    } = {},
): IRestServerMock {
    const mockServer: SetupServerApi = setupServer(
        ...mapRestHandlerMocksToRequestHandlers({
            handlers: defaultHandlers,
            defaultBaseApiUrl,
        }),
    );

    mockServer.listen();

    const restServerMock = {
        addRuntimeHandlers(...runtimeHandlers: IRestHandlerMock[]) {
            mockServer.use(
                ...mapRestHandlerMocksToRequestHandlers({
                    handlers: runtimeHandlers,
                    defaultBaseApiUrl,
                }),
            );
        },

        removeRuntimeHandlers() {
            mockServer.resetHandlers();
        },

        stopServer() {
            mockServer.close();
            if (saveServerInVar) {
                savedRestServerMock = null;
            }
        },
    };

    if (saveServerInVar) {
        savedRestServerMock = restServerMock;
    }

    return restServerMock;
}

export function getRestServerMock(): IRestServerMock {
    return savedRestServerMock;
}

function mapRestHandlerMocksToRequestHandlers({
    handlers,
    defaultBaseApiUrl = '',
}: {
    handlers: IRestHandlerMock[];
    defaultBaseApiUrl?: string;
}) {
    return handlers.map((handler) => {
        const {
            method = REQUEST_METHODS.GET,
            url,
            onRequest,
            status = 200,
            baseApiUrl,
        } = handler;

        const urlWithBase = `${baseApiUrl || defaultBaseApiUrl}${url}`;

        return METHOD_HANDLER_MAP[method](urlWithBase, (req, res, ctx) =>
            res(
                ctx.status(status),
                ctx.json(onRequest({
                    headers: req.headers.all(),
                    params: extractQueryParams(req.url),
                    body: req.body,
                })),
            ));
    });
}

function extractQueryParams(url: URL): Record<string, string> {
    const queryParams: Record<string, string> = {};

    url.searchParams.forEach((val, key) => {
        queryParams[key] = val;
    });

    return queryParams;
}
