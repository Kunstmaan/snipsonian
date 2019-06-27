import { ComponentClass, ReactNode } from 'react';

export interface IPage {
    key: string;
    component: IPageComponent;
}

type IPageComponent = ISyncComponent | IAsyncComponent;

type ISyncComponent = ComponentClass | ((props?: object) => JSX.Element);
type IAsyncComponent = ((props?: object) => Promise<{ default: ComponentClass | ((props?: object) => JSX.Element) }>);

export type ITemplate = (
    ComponentClass | ((props: { children: PageChildren }) => JSX.Element)
) & { hasRenderProps?: boolean };

type PageChildren = ReactNode | ((renderProps: object) => ReactNode);
