export default function appendUrlParam({url, paramName, paramValue}) {
    const separator = containsAnyUrlParam({url}) ? '&' : '?';
    return `${url}${separator}${paramName}=${paramValue}`;
}

function containsAnyUrlParam({url}) {
    return url.indexOf('?') > -1;
}