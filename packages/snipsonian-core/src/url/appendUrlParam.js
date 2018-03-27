export default function appendUrlParam({url, paramName, paramValue}) {
    const separator = containsAnyUrlParam({url}) ? '&' : '?';
    return `${url}${separator}${encodeURIComponent(paramName)}=${encodeURIComponent(paramValue)}`;
}

function containsAnyUrlParam({url}) {
    return url.indexOf('?') > -1;
}
