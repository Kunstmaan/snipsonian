import appendUrlParam from './appendUrlParam';

export default function appendUrlParamIfNotAlready({ url, paramName, paramValue }) {
    if (doesUrlContainParam({ url, paramName })) {
        return url;
    }

    return appendUrlParam({ url, paramName, paramValue });
}

function doesUrlContainParam({ url, paramName }) {
    return url.search(new RegExp(`[\\?&]${paramName}=`)) > -1;
}
