import { IUrlParams } from './types';
import appendUrlParam from './appendUrlParam';

export default function appendQueryParams({
    url,
    params = {},
}: {
    url: string;
    params?: IUrlParams;
}): string {
    return Object.keys(params)
        .filter((paramName) => !!params[paramName])
        .reduce(
            (accumulator, paramName) => appendUrlParam({
                paramName,
                url: accumulator,
                paramValue: params[paramName],
            }),
            url,
        );
}
