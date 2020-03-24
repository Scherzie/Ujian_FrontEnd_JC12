import {combineReducers} from 'redux';
import AuthReducers from './AuthReducers';
import HeaderReducers from './HeaderReducers';

export default combineReducers({
    Auth:AuthReducers,
    Header:HeaderReducers
})