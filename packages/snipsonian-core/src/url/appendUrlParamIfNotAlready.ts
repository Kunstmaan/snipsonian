import appendUrlParam, { encodeParamName, IAppendUrlParamInput } from './appendUrlParam';

export default function appendUrlParamIfNotAlready({
    url,
    paramName,
    paramValue,
}: IAppendUrlParamInput) {
    if (doesUrlContainParam({ url, paramName })) {
        return url;
    }

    return appendUrlParam({ url, paramName, paramValue });
}

function doesUrlContainParam({ url, paramName }: { url: string, paramName: string }) {
    const encodedParamName = encodeParamName(paramName);
    return url.search(new RegExp(`[\\?&]${encodedParamName}=`)) > -1;
}
