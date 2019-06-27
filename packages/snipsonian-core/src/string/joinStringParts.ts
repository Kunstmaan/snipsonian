import isSetString from './isSetString';

export default function joinStringParts({
    parts,
    joinSeparator = ' ',
}: {
    parts: string[];
    joinSeparator?: string;
}): string {
    return parts
        .filter(isSetString)
        .join(joinSeparator)
        .trim();
}
