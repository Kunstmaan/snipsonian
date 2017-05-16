export default function({firstPart, secondPart = '/'}) {
    try {
        return window.location.pathname.split(firstPart)[1].split(secondPart)[0];
    } catch (e) {
        return undefined;
    }
}