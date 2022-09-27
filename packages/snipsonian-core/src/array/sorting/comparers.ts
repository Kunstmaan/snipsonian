export type TSortComparerResult = -1 | 0 | 1;

export function stringComparerAscending(a: string, b: string): TSortComparerResult {
    const x = a || '';
    const y = b || '';

    return anyComparerAscending(x, y);
}

export function stringComparerAscendingIgnoreCase(a: string, b: string): TSortComparerResult {
    const x = a ? a.toLowerCase() : '';
    const y = b ? b.toLowerCase() : '';

    return anyComparerAscending(x, y);
}

export function anyComparerAscending(x: unknown, y: unknown): TSortComparerResult {
    return x < y
        ? -1
        : x > y
            ? 1
            : 0;
}

export function anyComparerDescending(x: unknown, y: unknown): TSortComparerResult {
    return (anyComparerAscending(x, y) * -1) as TSortComparerResult;
}
