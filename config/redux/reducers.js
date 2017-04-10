import {combineReducers} from 'redux';

import userReducer from '../../components/user/userReducer';

const reducers = combineReducers({
    user: userReducer
});

export default reducers;