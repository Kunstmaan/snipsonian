import isInteger from '@snipsonian/core/src/is/isInteger';
import { IReducerState } from '../reducer';
import { getRoute, getRouteKeyByPath } from '../route/routeManager';
import { IBaseRoute } from '../route/types';
import parseVirtualPage from './parseVirtualPage';

export interface IPayload {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [index: string]: any;
}

const NO_RERENDER = {
    EMPTY_OBJECT: {},
};

let reducerKey = 'NOT_SET_YET';

export function setReducerKey(newReducerKey: string): void {
    reducerKey = newReducerKey;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getReducerState<RouteKey extends string>(state: any): IReducerState<RouteKey> {
    return state[reducerKey] as IReducerState<RouteKey>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getCurrentRouteKey<RouteKey extends string>(state: any): RouteKey {
    return getReducerState(state).type as RouteKey;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getCurrentRouteInfo<Route extends IBaseRoute = IBaseRoute>(state: any): Route {
    return getRoute<Route>({
        routeKey: getCurrentRouteKey(state),
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getCurrentRoutePayload<Payload extends IPayload>(state: any): Payload {
    const payload = getReducerState(state).payload as IPayload;

    if (!payload || typeof payload !== 'object') {
        return payload as Payload;
    }

    return Object.keys(payload)
        .reduce(
            (accumulator, current: string) => {
                const value = payload[current];

                if (isInteger(value)) {
                    // eslint-disable-next-line no-param-reassign
                    accumulator[current] = Number(value);
                } else {
                    // eslint-disable-next-line no-param-reassign
                    accumulator[current] = typeof value === 'string' ? decodeURIComponent(value) : value;
                }

                return accumulator;
            },
            {} as Payload,
        );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getPropertyFromCurrentRoutePayload<Payload extends IPayload>(state: any, property: string): any {
    return getCurrentRoutePayload<Payload>(state)[property];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getCurrentRouteQueryParams<Query extends object>(state: any): Query {
    return (getReducerState(state).query || NO_RERENDER.EMPTY_OBJECT) as Query;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTopParentRouteKey(state: any): string {
    const currentRoutePathParts = getCurrentRouteInfo(state).path.split('/');
    // part 0 is the empty string 'before' the starting /
    return getRouteKeyByPath({
        path: `/${currentRoutePathParts[1]}`,
    });
}

export function isChildRouteOf<RouteKey extends string>(routeKey: RouteKey, possibleParentRouteKey: string): boolean {
    const route = getRoute({ routeKey });
    const possibleParentRoute = getRoute({ routeKey: possibleParentRouteKey as RouteKey });
    return route.path.indexOf(possibleParentRoute.path) === 0; // startsWith
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getVirtualPageForRoute(state: any, route: IBaseRoute): string {
    return parseVirtualPage(state, route.virtualPage);
}
