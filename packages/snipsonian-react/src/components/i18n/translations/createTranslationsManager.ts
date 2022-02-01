import { flatten } from 'flat';
import isString from '@snipsonian/core/src/is/isString';
import localStorage from '@snipsonian/browser/src/storage/localStorage';
import { ITranslations, ITranslationsPerLocale } from './types';
import { TranslationError } from './translationError';

export interface ITranslationsManager {
    supportedLocales: string[];
    setTranslationsOfLocale: (input: {
        locale: string;
        translations: ITranslations;
    }) => void;
    getTranslationsOfLocale: (input: { locale: string }) => ITranslations;
    getTranslation: (input: { locale: string; msgKey: string }) => string;
    areTranslationsRefreshedForLocale: (locale: string) => boolean;
}

export interface ITranslationsManagerConfig {
    locales: string[];
    // the 'initialTranslations' will be used if there are no translations yet stored in local storage
    initialTranslations: ITranslationsPerLocale;
    localStorageKey?: string; // only specify if translations have to be stored in localStorage
    /**
     * Will be called when, in the 'getTranslation' method, no translation was found for the input locale-key combo.
     * E.g. to be used for logging or error reporting.
     */
    onTranslationNotFound?: (input: { locale: string; msgKey: string }) => void;
    /**
     * When getTranslation is called and this string is ...
     * - 'return_key' (default) --> the translation key itself will be returned when no translation was found for it
     * - 'throw_error' --> an error will be thrown when there was no translation found for the key
     * - custom function --> the result of this function will be returned
     */
    returnWhenTranslationNotFound?: 'return_key' | 'throw_error' | TCustomReturnFunctionWhenTranslationNotFound;
}

type TCustomReturnFunctionWhenTranslationNotFound = (input: { locale: string; msgKey: string }) => string;

export default function createTranslationsManager({
    locales,
    initialTranslations,
    localStorageKey,
    onTranslationNotFound,
    returnWhenTranslationNotFound = 'return_key',
}: ITranslationsManagerConfig): ITranslationsManager {
    const allTranslations = getTranslationsToStartWith();

    const areTranslationsRefreshedPerLocale: {
        [locale: string]: boolean;
    } = {};

    const translationsManager: ITranslationsManager = {
        supportedLocales: locales,

        setTranslationsOfLocale({
            locale,
            translations,
        }: {
            locale: string;
            translations: ITranslations;
        }) {
            allTranslations[locale] = translations;
            if (localStorageKey) {
                storeTranslations(localStorageKey, locale, translations);
            }
            markTranslationsRefreshedForLocale(locale);
        },

        getTranslationsOfLocale({ locale }: { locale: string }) {
            return allTranslations[locale];
        },

        getTranslation({ locale, msgKey }: { locale: string; msgKey: string }) {
            const translation = translationsManager.getTranslationsOfLocale({ locale })[msgKey];

            if (!isString(translation)) {
                if (onTranslationNotFound) {
                    onTranslationNotFound({ locale, msgKey });
                }

                switch (returnWhenTranslationNotFound) {
                    case 'return_key':
                        return msgKey;
                    case 'throw_error':
                        throw new TranslationError({
                            locale,
                            msgKey,
                        });
                    default:
                        return returnWhenTranslationNotFound({ locale, msgKey });
                }
            }

            return translation;
        },

        areTranslationsRefreshedForLocale(locale: string) {
            return !!areTranslationsRefreshedPerLocale[locale];
        },
    };

    return translationsManager;

    function getTranslationsToStartWith(): ITranslationsPerLocale {
        const storedTranslations = localStorageKey
            ? getStoredTranslations(localStorageKey)
            : {};

        return locales.reduce(
            (accumulator, locale) => {
                // eslint-disable-next-line no-param-reassign
                accumulator[locale] = (storedTranslations && storedTranslations[locale])
                    ? storedTranslations[locale]
                    : flatten(initialTranslations[locale]);

                return accumulator;
            },
            {} as ITranslationsPerLocale,
        );
    }

    function markTranslationsRefreshedForLocale(locale: string) {
        areTranslationsRefreshedPerLocale[locale] = true;
    }
}

function getStoredTranslations(localStorageKey: string): ITranslationsPerLocale {
    return localStorage.read({ key: localStorageKey, defaultValue: {} }) as ITranslationsPerLocale;
}

function storeTranslations(localStorageKey: string, locale: string, translations: ITranslations) {
    const prevStoredTranslations = getStoredTranslations(localStorageKey);

    const updatedTranslations = {
        ...prevStoredTranslations,
        [locale]: translations,
    };

    localStorage.save({ key: localStorageKey, value: updatedTranslations });
}
