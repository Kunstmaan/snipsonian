import * as redux from 'redux';

import createReduxStore from '../../src/redux/createReduxStore';
import {STATE_STORAGE_TYPE} from '../../src/redux/storageType';
import {STATE_STORAGE_KEY} from '../redux.config';
import {isStateStorageEnabled} from '../develop.config';

import './reducers';

export default createReduxStore({
    redux,
    stateStorageType: getStateStorageType(),
    stateStorageKey: STATE_STORAGE_KEY
});

function getStateStorageType() {
    return isStateStorageEnabled ? STATE_STORAGE_TYPE.LOCAL : STATE_STORAGE_TYPE.NO_STORAGE;
}