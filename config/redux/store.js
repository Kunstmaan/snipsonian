import * as redux from 'redux';

import createReduxStore from '../../src/redux/createReduxStore';
import STORE_STORAGE_TYPE from '../../src/redux/storeStorageType';
import {STORE_STORAGE_KEY} from '../redux.config';
import {isStateStorageEnabled} from '../develop.config';

import '../../components/user/userReducer';

export default createReduxStore({
    redux,
    storeStorageType: getStoreStorageType(),
    storeStorageKey: STORE_STORAGE_KEY
});

function getStoreStorageType() {
    return isStateStorageEnabled ? STORE_STORAGE_TYPE.LOCAL : STORE_STORAGE_TYPE.NO_STORAGE;
}