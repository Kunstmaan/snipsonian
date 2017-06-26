export default function({firstPart, secondPart = '/', url = getUrl()}) {
    try {
        return url.split(firstPart)[1].split(secondPart)[0];
    } catch (e) {
        return undefined;
    }
}

function getUrl() {
    return window.location.pathname;
}