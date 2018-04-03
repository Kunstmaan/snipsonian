export default function getPartBetween({ firstPart, secondPart, input }) {
    try {
        return getPartAfter({ separator: firstPart, input }).split(secondPart)[0];
    } catch (e) {
        return undefined;
    }
}

function getPartAfter({ separator, input }) {
    return input.substr(input.indexOf(separator) + separator.length);
}
