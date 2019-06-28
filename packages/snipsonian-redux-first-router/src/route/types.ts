import { RouteObject } from 'redux-first-router';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TVirtualPageConfig<AppState = any> = string | TVirtualPageConfigPart<AppState>[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TVirtualPageConfigPart<AppState = any> = string | TVirtualPagePartSelector<AppState>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TVirtualPagePartSelector<AppState = any> = (state: AppState) => string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IBaseRoute<Page = any, Template = any, AppState = any> extends RouteObject {
    page: Page;
    pageProps?: object;
    template: Template;
    templateProps?: object;
    virtualPage?: TVirtualPageConfig<AppState>;
    allowAnonymousAccess?: boolean; // default false
    groups?: string[]; // to group related routes
}

export interface IBaseRoutes<Route extends IBaseRoute = IBaseRoute> {
    [key: string]: Route;
}
