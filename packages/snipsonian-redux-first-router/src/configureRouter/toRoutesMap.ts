import { RoutesMap } from 'redux-first-router';
import { IBaseRoutes } from '../route/types';

export default function toRoutesMap(routes: IBaseRoutes): RoutesMap {
    return Object.keys(routes)
        .reduce(
            (accumulator, routeKey) => {
                const { path } = routes[routeKey];
                // eslint-disable-next-line no-param-reassign
                accumulator[routeKey] = { path };
                return accumulator;
            },
            {} as RoutesMap,
        );
}
