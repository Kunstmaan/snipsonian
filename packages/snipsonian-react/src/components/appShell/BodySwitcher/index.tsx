import * as React from 'react';
import { IPage } from '../../../models/pages.models';
import { isReactComponentClass } from '../../../utils/isReactComponentClass';

const cachedAsyncPages: { [pageKey: string]: React.ComponentClass | (() => JSX.Element) } = {};

interface IPublicProps {
    page: IPage;
    pageProps?: object;
    renderProps?: object;
    AsyncPageLoader?: React.ElementType;
}

export default class BodySwitcher extends React.Component<IPublicProps> {
    public shouldComponentUpdate(nextProps: IPublicProps) {
        const { page, pageProps } = this.props;
        return (
            isDifferentPage(page, nextProps.page) ||
            arePagePropsDifferent(pageProps, nextProps.pageProps)
        );
    }

    public render() {
        const { renderProps } = this.props;

        return this.renderPage(renderProps);
    }

    public renderPage(renderProps?: object) {
        const { page, pageProps } = this.props;
        const possibleAsyncPage = cachedAsyncPages[page.key];
        if (typeof possibleAsyncPage !== 'undefined') {
            return React.createElement<{ renderProps?: object }>(possibleAsyncPage, { ...pageProps, renderProps });
        }

        return this.loadPage(renderProps);
    }

    public loadPage(renderProps?: object) {
        const { page, pageProps, AsyncPageLoader } = this.props;
        const props = { ...pageProps, renderProps };
        if (!isReactComponentClass(page.component)) {
            const pageResult = page.component(props);
            if (pageResult instanceof Promise) {
                pageResult.then((asyncPage) => {
                    cachedAsyncPages[page.key] = asyncPage.default;
                    this.forceUpdate();
                });
                return !!AsyncPageLoader && <AsyncPageLoader />;
            }
            return React.createElement<{ renderProps?: object }>(page.component as React.FunctionComponent, props);
        }
        return React.createElement<{ renderProps?: object }>(page.component, props);
    }
}

export function getCachedAsyncPageComponent(pageKey: string) {
    return cachedAsyncPages[pageKey];
}

function isDifferentPage(currentPage: IPage, nextPage: IPage): boolean {
    if (!currentPage || !nextPage) {
        return true;
    }
    return currentPage.key !== nextPage.key;
}

function arePagePropsDifferent(currentPageProps: object, nextPageProps: object): boolean {
    return JSON.stringify(currentPageProps) !== JSON.stringify(nextPageProps);
}
