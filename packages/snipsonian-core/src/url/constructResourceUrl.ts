import appendQueryParams from './appendQueryParams';
import replacePathParams from './replacePathParams';
import { IUrlParams } from './types';

export default function constructResourceUrl({
    url,
    baseUrl = '',
    pathParams,
    queryParams,
}: {
    url: string;
    baseUrl?: string;
    pathParams?: IUrlParams;
    queryParams?: IUrlParams;
}): string {
    const prefixedUrl = `${baseUrl}${url}`;

    return [prefixedUrl]
        .map((resourceUrl) => replacePathParams({ url: resourceUrl, params: pathParams }))
        .map((resourceUrl) => appendQueryParams({ url: resourceUrl, params: queryParams }))
        .pop();
}
