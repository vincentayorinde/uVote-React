import { combineReducers } from 'redux';
import parties from './parties';
import errors from './errors';
import success from './success';
import auth from './auth';

export default combineReducers({
    parties,
    errors,
    success,
    auth
});
