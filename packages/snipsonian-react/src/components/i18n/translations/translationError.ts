import { isError } from '@snipsonian/core/es/error/isError';

const TRANSLATION_ERROR_NAME = 'TranslationError';

export class TranslationError extends Error {
    locale: string;
    msgKey: string;

    constructor({
        locale,
        msgKey,
    }: {
        locale: string;
        msgKey: string;
    }) {
        super('No translation was found for input locale-msgKey combination.');

        this.name = TRANSLATION_ERROR_NAME;
        this.locale = locale;
        this.msgKey = msgKey;
    }
}

export function isTranslationErrorTypeGuard(
    input: unknown | TranslationError,
): input is TranslationError {
    if (isError(input)) {
        return input.name === TRANSLATION_ERROR_NAME;
    }

    return false;
}
