import React from 'react';
import {Provider} from 'react-redux';

import store from '../config/redux/store';
import {switchVersion} from '../components/user/userActions';

const urlVersion = getVersionIfAnyFromUrl();

if (urlVersion) {
    store.dispatch(switchVersion(urlVersion));
}

export default function wrapRootComponent(Root) {
    return () => (
        <Provider store={store}>
            <Root />
        </Provider>
    );
}

function getVersionIfAnyFromUrl() {
    if (isClientSide()) {
        const matches = window.location.pathname.match(/\/doc\/(.*)\//);
        if (matches !== null) {
            return matches[1];
        }
    }

    return false;
}

function isClientSide() {
    return (typeof window !== 'undefined') && window.location;
}