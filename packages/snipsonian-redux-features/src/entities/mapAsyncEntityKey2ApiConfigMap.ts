import isSet from '@snipsonian/core/src/is/isSet';
import { IAsyncEntityKey2ApiConfigMap, IAsyncEntityKey2FetchApiConfigMap } from './types';

export function mapToFetchApiConfigMap<State>(
    apiConfigMap: IAsyncEntityKey2ApiConfigMap<State>,
): IAsyncEntityKey2FetchApiConfigMap<State> {
    return Object.keys(apiConfigMap)
        .reduce(
            (accumulator, asyncEntityKey) => {
                const asyncEntityApiConfig = apiConfigMap[asyncEntityKey];
                if (isSet(asyncEntityApiConfig.fetch)) {
                    // eslint-disable-next-line no-param-reassign
                    accumulator[asyncEntityKey] = asyncEntityApiConfig.fetch;
                }
                return accumulator;
            },
            {} as IAsyncEntityKey2FetchApiConfigMap<State>,
        );
}
