import { Middleware, StoreEnhancer } from 'redux';
import { connectRoutes, Options } from 'redux-first-router';
import { createBrowserHistory } from 'history';
import * as queryString from 'query-string';
import isSet from '@snipsonian/core/src/is/isSet';
import { REDUCER_STORAGE_TYPE } from '@snipsonian/redux/src/config/storageType';
import { TReducer } from '@snipsonian/redux/src/reducer/createReducer';
import { TTransformReducerStateForStorage } from '@snipsonian/redux/src/reducer/reducerManager';
import registerProvidedReducer from '@snipsonian/redux/src/reducer/registerProvidedReducer';
import { DEFAULT_REDUCER_KEY } from '../reducer';
import { setReducerKey } from '../selectors';
import { IBaseRoutes } from '../route/types';
import { getRegisteredRoutes } from '../route/routeManager';
import toRoutesMap from './toRoutesMap';

export interface IConfigureOptions<ReducerState> {
    reducerKey?: string;
    routes?: IBaseRoutes;
    initialDispatch?: boolean;
    reducerStorageType?: REDUCER_STORAGE_TYPE;
    transformReducerStateForStorage?: TTransformReducerStateForStorage<ReducerState>;
    otherRouterOptions?: Partial<Options>;
}

interface IConfiguredRouter {
    middleware: Middleware;
    enhancer: StoreEnhancer;
}

export default function configureRouter<ReducerState>({
    reducerKey = DEFAULT_REDUCER_KEY,
    routes = getRegisteredRoutes(),
    initialDispatch,
    reducerStorageType = REDUCER_STORAGE_TYPE.NO_STORAGE,
    transformReducerStateForStorage,
    otherRouterOptions = {},
}: IConfigureOptions<ReducerState>): IConfiguredRouter {
    setReducerKey(reducerKey);

    const routerOptions: Options = {
        location: reducerKey,
        initialDispatch: isSet(initialDispatch) ? initialDispatch : true,
        querySerializer: queryString,
        createHistory: createBrowserHistory,
        ...otherRouterOptions,
    };

    const {
        reducer,
        middleware,
        enhancer,
    } = connectRoutes(
        toRoutesMap(routes),
        routerOptions,
    );

    registerProvidedReducer<ReducerState>(
        reducer as unknown as TReducer<ReducerState>,
        {
            key: reducerKey,
            reducerStorageType,
            transformReducerStateForStorage,
        },
    );

    return {
        middleware,
        enhancer,
    };
}
