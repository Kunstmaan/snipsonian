/* global window */

import {SWITCH_VERSION} from './userActions';
import {LATEST_VERSION} from '../../config/versions.config';

const INITIAL_STATE = {
    version: getVersionIfAnyFromUrl() || LATEST_VERSION
};

const userReducer = (state = INITIAL_STATE, action) => {
    if (!action.type || !action.payload) {
        return state;
    }

    switch (action.type) {
        case SWITCH_VERSION: {
            const newState = Object.assign({}, state);

            newState.version = action.payload.newVersion;

            return newState;
        }

        default:
            return state;
    }
};

export default userReducer;

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