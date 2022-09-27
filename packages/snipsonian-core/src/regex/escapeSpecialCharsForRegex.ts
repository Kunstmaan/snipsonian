/**
 * To be used when e.g. a user-input-string has to be turned into a regex for client-side-searching
 */
export default function escapeSpecialCharsForRegex(input: string) {
    if (!input) {
        return input;
    }

    return input
        .replaceAll('.', '\\.')
        .replaceAll('+', '\\+')
        .replaceAll('*', '\\*')
        .replaceAll('?', '\\?');
}
