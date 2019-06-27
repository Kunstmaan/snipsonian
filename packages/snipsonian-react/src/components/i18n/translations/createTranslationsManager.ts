import flatten from 'flat';
import localStorage from '@snipsonian/browser/src/storage/localStorage';
import { ITranslations, ITranslationsPerLocale } from './types';

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
}

export default function createTranslationsManager({
    locales,
    initialTranslations,
    localStorageKey,
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
            return translationsManager.getTranslationsOfLocale({ locale })[msgKey];
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
            // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
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
