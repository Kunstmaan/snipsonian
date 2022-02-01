import replacePlaceholders from '@snipsonian/core/src/string/replacePlaceholders';
import { ILocaleTranslators, TTranslator, TTranslatorInput } from './types';
import { ITranslationsManager } from '../translations/createTranslationsManager';

export const SHOW_MSG_KEY_TRANSLATOR = (input: TTranslatorInput) => {
    const { msg } = getTranslatorInputParts(input);

    return msg;
};

let localeTranslators: ILocaleTranslators = {};
const translatorCopyCache: { [key: string]: TTranslator } = {};

export function setLocaleTranslators(newLocaleTranslators: ILocaleTranslators) {
    localeTranslators = newLocaleTranslators;
}

export function getTranslator({
    locale,
    showTranslationKeys = false,
    areTranslationsRefreshed = true,
}: {
    locale: string;
    showTranslationKeys?: boolean;
    areTranslationsRefreshed?: boolean;
}): TTranslator {
    if (areTranslationsRefreshed) {
        return getPreGeneratedTranslator(
            locale,
            showTranslationKeys,
        );
    }

    return getTranslatorCopySoThatAfterTranslationsRefreshAllTranslationsWillBeReRendered(
        locale,
        showTranslationKeys,
    );
}

function getPreGeneratedTranslator(locale: string, showTranslationKeys: boolean) {
    if (showTranslationKeys) {
        return SHOW_MSG_KEY_TRANSLATOR;
    }

    return localeTranslators[locale];
}

function getTranslatorCopySoThatAfterTranslationsRefreshAllTranslationsWillBeReRendered(
    locale: string, showTranslationKeys: boolean,
) {
    const uniqueKey = `${locale}-${showTranslationKeys}`;

    if (!translatorCopyCache[uniqueKey]) {
        /**
         * The bind ensures that it returns a different/new copy then the default one.
         * So after a refresh a re-render of all translations is triggered.
         */
        translatorCopyCache[uniqueKey] = getPreGeneratedTranslator(locale, showTranslationKeys).bind(null);
    }

    return translatorCopyCache[uniqueKey];
}

export function initDefaultTranslator({
    locale,
    translationsManager,
}: {
    locale: string;
    translationsManager: ITranslationsManager;
}) {
    return (input: TTranslatorInput) => {
        const { msg, placeholders } = getTranslatorInputParts(input);

        const translation = translationsManager.getTranslation({ locale, msgKey: msg });

        if (!translation) {
            /** when translation not found, and the getTranslation did not throw an error, then
             * the msg key itself will be returned */
            return msg;
        }

        return replacePlaceholders({ placeholders, msg: translation });
    };
}

export function getTranslatorInputParts(input: TTranslatorInput) {
    const { msg, placeholders = {} } = typeof input === 'string' ? { msg: input } : input;

    return {
        msg,
        placeholders,
    };
}
