export function toAnchorTargetId(key: string): string {
    return slugifyStringAsId(key);
}

export function toAnchorLinkHref(key: string): string {
    return `#${slugifyStringAsId(key)}`;
}

function slugifyStringAsId(key: string): string {
    return key
        .trim()
        .toLowerCase()
        .replace(' ', '-');
}
