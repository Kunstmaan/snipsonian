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

function doesUrlContainParam({ url, paramName }) {
    const encodedParamName = encodeParamName(paramName);
    return url.search(new RegExp(`[\\?&]${encodedParamName}=`)) > -1;
}
