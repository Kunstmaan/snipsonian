export default function getUrlPartBetween({firstPart, secondPart = '/', url}) {
    try {
        return url.split(firstPart)[1].split(secondPart)[0];
    } catch (e) {
        return undefined;
    }
}
