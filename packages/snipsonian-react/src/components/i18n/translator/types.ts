import { ReactNode } from 'react';

export type TTranslator = (input: TTranslatorInput) => string;

export type TTranslatorInput = { msg: string; placeholders?: ITranslatorPlaceholders } | string;

export interface ITranslatorPlaceholders {
    [key: string]: string | ReactNode;
}

export interface ILocaleTranslators {
    [locale: string]: TTranslator;
}
