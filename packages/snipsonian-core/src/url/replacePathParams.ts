import { IUrlParams } from './types';
import isString from '../is/isString';
import replacePlaceholders from '../string/replacePlaceholders';

export default function replacePathParams({
    url,
    params = {},
}: {
    url: string;
    params?: IUrlParams;
}): string {
    return replacePlaceholders({
        msg: url,
        placeholders: encodeStringParams(params),
    });
}

function encodeStringParams(params: IUrlParams): IUrlParams {
    if (!params) {
        return params;
    }

    return Object.keys(params)
        .reduce(
            (paramAccumulator, key) => {
                const val = params[key];
                // eslint-disable-next-line no-param-reassign
                paramAccumulator[key] = isString(val) ? encodeURIComponent(val as string) : val;
                return paramAccumulator;
            },
            // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
            {} as IUrlParams,
        );
}
