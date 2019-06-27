import React from 'react';
import { TTranslator } from '../translator/types';

const I18nContext = React.createContext({
    translator: {} as TTranslator, // eslint-disable-line @typescript-eslint/no-object-literal-type-assertion
    locale: '',
});

export default I18nContext;
