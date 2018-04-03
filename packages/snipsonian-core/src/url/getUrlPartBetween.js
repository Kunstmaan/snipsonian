import getPartBetween from '../string/getPartBetween';

export default function getUrlPartBetween({firstPart, secondPart = '/', url}) {
    return getPartBetween({
        firstPart,
        secondPart,
        input: url
    });
}
