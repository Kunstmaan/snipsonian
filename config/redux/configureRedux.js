import * as redux from 'redux';

import createReduxStore, {STORE_STORAGE_TYPE} from '../../src/redux/createReduxStore';
import reducers from './reducers';
import {STORE_STORAGE_KEY} from '../redux.config';
import {isStateStorageEnabled} from '../develop.config';

export default createReduxStore({
    redux,
    reducers,
    middlewares: [],
    storeStorageType: isStateStorageEnabled ? STORE_STORAGE_TYPE.LOCAL : STORE_STORAGE_TYPE.NO_STORAGE,
    storeStorageKey: STORE_STORAGE_KEY
});
