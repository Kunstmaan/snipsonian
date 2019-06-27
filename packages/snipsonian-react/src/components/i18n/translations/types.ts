export interface ITranslations {
    [msgKey: string]: string;
}

export interface ITranslationsPerLocale {
    [locale: string]: ITranslations;
}
