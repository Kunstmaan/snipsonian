import { ILocaleTranslators } from './types';
import { ITranslationsManager } from '../translations/createTranslationsManager';
import { initDefaultTranslator, setLocaleTranslators } from './translatorManager';

/**
 * To avoid un-necessary re-renders, we want that the 'getTranslator' selector
 * keeps returning the same translator function as much as possible (vs. generating
 * a new lambda/function each time the selector gets called).
 * Therefor we here generate all possible translators (1 per locale + 1 for when the
 * user wants to see the translation keys) at startup + return one of those pre-generated
 * translators depending on the current locale (from the redux state).
 */

export default function generateTranslatorForEachSupportedLocale({
    translationsManager,
}: {
    translationsManager: ITranslationsManager;
}): ILocaleTranslators {
    const localeTranslators = translationsManager.supportedLocales
        .reduce(
            (translatorAccumulator, locale) => {
                // eslint-disable-next-line no-param-reassign
                translatorAccumulator[locale] = initDefaultTranslator({
                    locale,
                    translationsManager,
                });

                return translatorAccumulator;
            },
            {} as ILocaleTranslators,
        );

    setLocaleTranslators(localeTranslators);

    return localeTranslators;
}
