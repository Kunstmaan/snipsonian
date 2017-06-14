/* global window */

import {SWITCH_VERSION} from './userActions';
import {LATEST_VERSION} from '../../config/versions.config';
import createReducer from '../../src/redux/createReducer'

const initialState = {
    version: getVersionIfAnyFromUrl() || LATEST_VERSION
};

const actionHandlers = {
    [SWITCH_VERSION]: ({state, action}) => {
        const newState = Object.assign({}, state);

        newState.version = action.payload.newVersion;

        return newState;
    }
};

export default createReducer({
    initialState,
    actionHandlers
});

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