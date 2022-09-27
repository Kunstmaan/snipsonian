export function getCurrentDate() {
    return new Date();
}

export function getCurrentYear(): number {
    return getCurrentDate().getFullYear();
}

export function getCurrentTimestamp(): number {
    return getCurrentDate().getTime();
}
