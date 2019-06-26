import {combineReducers} from 'redux';
import nav from './nav';
import user from './user';

const reducers = combineReducers({
    nav,
    user
})

export default reducers