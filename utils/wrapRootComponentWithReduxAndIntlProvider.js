import React from 'react';
import {Provider} from 'react-redux';

import store from '../config/redux/configureRedux';
import IntlReduxProvider from '../components/i18n/IntlReduxProvider.component';

export default function wrapRootComponentWithReduxProvider(Root) {
    return () => (
        <Provider store={store}>
            <IntlReduxProvider>
                <Root />
            </IntlReduxProvider>
        </Provider>
    );
}