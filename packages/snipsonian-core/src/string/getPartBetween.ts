export default function getPartBetween({
    firstPart,
    secondPart,
    input,
}: {
    firstPart: string,
    secondPart: string,
    input: string,
}) {
    try {
        return getPartAfter({ separator: firstPart, input }).split(secondPart)[0];
    } catch (e) {
        return undefined;
    }
}

function getPartAfter({ separator, input }: { separator: string, input: string }) {
    return input.substr(input.indexOf(separator) + separator.length);
}
