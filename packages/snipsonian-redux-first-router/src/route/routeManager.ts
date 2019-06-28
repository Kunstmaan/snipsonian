import { IBaseRoute, IBaseRoutes } from './types';

let allRoutes: IBaseRoutes;

export function registerRoutes(routes: IBaseRoutes): void {
    allRoutes = routes;
}

export function getRegisteredRoutes<Route extends IBaseRoute = IBaseRoute>(): IBaseRoutes<Route> {
    return allRoutes as IBaseRoutes<Route>;
}

export function getRoute<Route extends IBaseRoute = IBaseRoute>({ routeKey }: { routeKey: string }): Route {
    return allRoutes[routeKey] as Route;
}

export function getRoutePath({ routeKey }: { routeKey: string }): string {
    return getRoute({ routeKey }).path;
}

export function getRouteKeyByPath({ path }: { path: string }): string {
    return getAllRouteKeys()
        .find((routeKey) => getRoute({ routeKey }).path === path);
}

export function doesRouteBelongToGroup({ routeKey, group }: { routeKey: string; group: string }): boolean {
    const route = getRoute({ routeKey });
    if (!route || !route.groups) {
        return false;
    }
    return route.groups.indexOf(group) > -1;
}

export function getRouteKeysThatBelongToGroup({ group }: { group: string }): string[] {
    return getAllRouteKeys()
        .filter((routeKey) => doesRouteBelongToGroup({ routeKey, group }));
}

function getAllRouteKeys(): string[] {
    return Object.keys(allRoutes);
}
