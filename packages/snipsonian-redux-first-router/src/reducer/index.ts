import { Location, LocationState } from 'redux-first-router';

export const DEFAULT_REDUCER_KEY = 'route';

export interface IReducerState<RouteKey extends string> extends LocationState {
    type: RouteKey;
    prev: IPrevLocation<RouteKey>;
}

export interface IPrevLocation<RouteKey extends string> extends Location {
    type: RouteKey;
}
