import React from 'react';
import {Provider} from 'react-redux';

import store from '../config/redux/configureRedux';

export default function wrapRootComponentWithReduxProvider(Root) {
    return () => (
        <Provider store={store}>
            <Root />
        </Provider>
    );
}