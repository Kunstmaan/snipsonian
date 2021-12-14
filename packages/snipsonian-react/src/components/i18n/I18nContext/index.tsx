import React from 'react';
import { TTranslator } from '../translator/types';

const I18nContext = React.createContext({
    translator: {} as TTranslator,
    locale: '',
});

export default I18nContext;
