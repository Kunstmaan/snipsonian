import flatten from 'flat';
import enMessages from './i18n/en.yaml';
import nlMessages from './i18n/nl.yaml';

export const LANGUAGES = [
    'en',
    'nl'
];

export const DEFAULT_LANGUAGE = 'en';

export const MESSAGES = {
    en: flatten(enMessages),
    nl: flatten(nlMessages)
};
