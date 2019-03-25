import getPartBetween from '../string/getPartBetween';

export default function getUrlPartBetween({
    url,
    firstPart,
    secondPart = '/',
}: {
    url: string;
    firstPart: string;
    secondPart?: string;
}): string {
    return getPartBetween({
        input: url,
        firstPart,
        secondPart,
    });
}
